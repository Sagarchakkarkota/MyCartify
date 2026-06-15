import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
  type Notification,
} from '@notifee/react-native';
import Toast from 'react-native-toast-message';
import { globalPostRequest } from '../libs/axios/request';
import { useAuthStore } from '../store/authStore';
import { navigateFromNotificationData } from './notifications/handleNotificationNavigation';
import { navigationRef } from '../navigation/navigationRef';

const NOTIF_PENDING_STORAGE_KEY = 'mycartify.pendingNotificationData';
const ANDROID_CHANNEL_ID = 'mycartify';

let notificationsInitialized = false;

const requestAndroidPostNotificationsPermission = async () => {
  if (Platform.OS !== 'android') return true;

  // Android 13+ requires runtime permission.
  if (Platform.Version < 33) return true;

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

export const requestNotificationPermission = async () => {
  const androidGranted = await requestAndroidPostNotificationsPermission();
  if (!androidGranted) return false;

  const authStatus = await messaging().requestPermission({
    // iOS only; harmless on Android
    alert: true,
    sound: true,
    badge: true,
  });

  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
};

const registerDeviceTokenWithBackend = async (token: string) => {
  const userId = useAuthStore.getState().user?.id;

  try {
    await globalPostRequest({
      url: '/notifications/register-device',
      data: {
        userId: userId || null,
        token,
        platform: Platform.OS,
      },
    });
  } catch (error) {
    // Non-fatal: token may still be usable even if backend is unreachable.
    // eslint-disable-next-line no-console
    console.log('Failed to register device token', error);
  }
};

const ensureAndroidChannel = async () => {
  if (Platform.OS !== 'android') return;
  await notifee.createChannel({
    id: ANDROID_CHANNEL_ID,
    name: 'MyCartify',
    importance: AndroidImportance.HIGH,
  });
};

const extractTitleBody = (remoteMessage: any) => {
  const title =
    remoteMessage?.notification?.title || remoteMessage?.data?.title;
  const body = remoteMessage?.notification?.body || remoteMessage?.data?.body;
  return { title: title || 'Notification', body };
};

const extractImageUrl = (remoteMessage: any) => {
  return (
    remoteMessage?.data?.imageUrl ||
    remoteMessage?.notification?.imageUrl ||
    remoteMessage?.notification?.android?.imageUrl ||
    remoteMessage?.notification?.apple?.imageUrl
  );
};

const isValidNotificationImageUrl = (url: unknown): url is string => {
  if (typeof url !== 'string') return false;

  const trimmedUrl = url.trim();
  if (!trimmedUrl) return false;

  return /^(https?:|file:|content:)/i.test(trimmedUrl);
};

// Display a local notification so you can control channel + click handling.
const displayLocalNotification = async (remoteMessage: any) => {
  await ensureAndroidChannel();

  const { title, body } = extractTitleBody(remoteMessage);
  const data = remoteMessage?.data || {};
  const imageUrl = extractImageUrl(remoteMessage);
  const notificationImageUrl = isValidNotificationImageUrl(imageUrl)
    ? imageUrl.trim()
    : undefined;

  const notification: Notification = {
    title,
    body,
    data,
    android: {
      channelId: ANDROID_CHANNEL_ID,
      pressAction: { id: 'default' },
      smallIcon: 'ic_launcher',
      largeIcon: 'my_cart_logo_filled',
      ...(notificationImageUrl
        ? {
            style: {
              type: AndroidStyle.BIGPICTURE,
              picture: notificationImageUrl,
            },
          }
        : {}),
    },
    ...(notificationImageUrl
      ? {
          ios: {
            attachments: [{ url: notificationImageUrl }],
          },
        }
      : {}),
  };

  await notifee.displayNotification(notification);
};

const consumePendingNotificationData = async () => {
  const raw = await AsyncStorage.getItem(NOTIF_PENDING_STORAGE_KEY);
  if (!raw) return;
  await AsyncStorage.removeItem(NOTIF_PENDING_STORAGE_KEY);

  try {
    const data = JSON.parse(raw);
    navigateFromNotificationData(data);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Failed to parse pending notification', e);
  }
};

const waitForNavigationReady = async (timeoutMs = 4000) => {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (navigationRef.isReady()) return;
    // eslint-disable-next-line no-await-in-loop
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), 200);
    });
  }
};

const bootstrapInitialNotificationNavigation = async () => {
  // Android: Notifee supports initial notification for app-open events.
  try {
    const initial = await notifee.getInitialNotification();
    const data = initial?.notification?.data;
    if (data) {
      await waitForNavigationReady();
      navigateFromNotificationData(data as any);
      return;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('getInitialNotification error', e);
  }

  // Additional fallback: react-native-firebase "opened app" events.
  try {
    const opened = await messaging().getInitialNotification();
    if (opened?.data) {
      await waitForNavigationReady();
      navigateFromNotificationData(opened.data as any);
      return;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('messaging.getInitialNotification error', e);
  }

  // Fallback for background press handling (i.e., notification opened after quit)
  await waitForNavigationReady();
  await consumePendingNotificationData();
};

const handleForegroundPress = ({ detail }: any) => {
  const data = detail?.notification?.data;
  if (data) {
    navigateFromNotificationData(data);
  }
};

export const initializeNotifications = async () => {
  if (notificationsInitialized) return;
  notificationsInitialized = true;

  const channelSetupPromise = ensureAndroidChannel();

  const enabled = await requestNotificationPermission();
  if (!enabled) {
    notificationsInitialized = false;
    return;
  }

  await channelSetupPromise;

  try {
    await messaging().registerDeviceForRemoteMessages();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('registerDeviceForRemoteMessages error', e);
  }

  const token = await messaging().getToken();
  if (token) {
    // eslint-disable-next-line no-console
    console.log('[FCM] token', token);
    await registerDeviceTokenWithBackend(token);
  }

  messaging().onTokenRefresh(async newToken => {
    // eslint-disable-next-line no-console
    console.log('[FCM] token refreshed', newToken);
    await registerDeviceTokenWithBackend(newToken);
  });

  // Foreground remote messages => show local notification.
  messaging().onMessage(async remoteMessage => {
    // eslint-disable-next-line no-console
    console.log('[FCM] onMessage', remoteMessage?.messageId);

    await displayLocalNotification(remoteMessage);

    // Optional: also show an in-app toast (keeps existing UX minimal).
    const { title, body } = extractTitleBody(remoteMessage);
    Toast.show({
      type: 'info',
      text1: title,
      text2: body,
      position: 'top',
    });
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage?.data) {
      navigateFromNotificationData(remoteMessage.data as any);
    }
  });

  // When user taps a Notifee-displayed notification while app is in foreground.
  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) {
      handleForegroundPress({ detail });
    }
  });

  // If app was opened by a notification press, navigate to correct screen.
  await bootstrapInitialNotificationNavigation();
};
