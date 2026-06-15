/**
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppRegistry, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import App from './App';
import { name as appName } from './app.json';

const NOTIF_PENDING_STORAGE_KEY = 'mycartify.pendingNotificationData';

// Register background event handler as early as possible.
notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type !== EventType.PRESS) return;

  const data = detail?.notification?.data;
  if (!data) return;

  try {
    await AsyncStorage.setItem(
      NOTIF_PENDING_STORAGE_KEY,
      JSON.stringify(data || {}),
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Failed storing pending notification (background)', e);
  }
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // For production, we show a local notification using Notifee.
  // This also ensures notification click flows consistently.
  try {
    if (remoteMessage?.notification) {
      return;
    }

    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'mycartify',
        name: 'MyCartify',
        importance: AndroidImportance.HIGH,
      });
    }

    const title =
      remoteMessage?.notification?.title || remoteMessage?.data?.title;
    const body =
      remoteMessage?.notification?.body || remoteMessage?.data?.body;
    const data = remoteMessage?.data || {};

    await notifee.displayNotification({
      title: title || 'Notification',
      body,
      data,
      android: {
        channelId: 'mycartify',
        pressAction: { id: 'default' },
      },
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Background message handler error', e);
  }
});

AppRegistry.registerComponent(appName, () => App);
