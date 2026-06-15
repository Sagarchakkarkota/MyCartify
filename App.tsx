import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from './src/context/ThemeContext';
import { queryClient } from './src/libs/reactQuery/queryClient';
import RootNavigator from './src/navigation/RootNavigator';
import { initializeNotifications } from './src/services/notificationService';
import {
  addApiSslPinningErrorListener,
  initializeApiSslPinning,
} from './src/services/sslPinning';
import { useAuthStore } from './src/store/authStore';
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  console.log(useAuthStore.getState().accessToken);
  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  useEffect(() => {
    const sslPinningSubscription = addApiSslPinningErrorListener();

    initializeApiSslPinning().catch(error => {
      console.warn('SSL pinning initialization failed', error);
    });
    initializeNotifications();

    return () => {
      sslPinningSubscription?.remove();
    };
  }, []);
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootNavigator />
          <Toast />
        </SafeAreaProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
