import { navigationRef } from '../../navigation/navigationRef';
import { useAuthStore } from '../../store/authStore';

type NotificationData = Record<string, string | number | boolean | null | undefined>;

const toStringMaybe = (v: any) => {
  if (v === null || v === undefined) return undefined;
  return typeof v === 'string' ? v : String(v);
};

// Expected FCM payload example:
// data: { route: 'ProductDetail', id: '123' }
export const  navigateFromNotificationData = (data?: NotificationData) => {
  if (!data) return;
  if (!navigationRef.isReady()) return;

  const route = toStringMaybe(data.route || (data as any).screen);
  const id = toStringMaybe((data as any).id);

  if (route === 'ProductDetail' && id) {
    navigationRef.navigate('App', {
      screen: 'ProductDetail',
      params: { id },
    });
    return;
  }

  if (route === 'Orders' || route === 'Checkout' || route === 'Profile') {
    const isAuthenticated = useAuthStore.getState().isAuthenticated();
    if (!isAuthenticated) {
      navigationRef.navigate('Auth', { screen: 'Login' });
      return;
    }

    navigationRef.navigate('App', { screen: route });
    return;
  }

  // Default deep-link fallback
  if (route === 'Tabs' || route === 'Home' || !route) {
    navigationRef.navigate('App', { screen: 'Tabs' });
  }
};

