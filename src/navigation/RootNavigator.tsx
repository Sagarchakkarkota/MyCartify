import type { LinkingOptions } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { navigationRef } from './navigationRef';

const linking: LinkingOptions<any> = {
  prefixes: ['mycartify://'],
  config: {
    screens: {
      App: {
        screens: {
          Tabs: {
            screens: {
              Home: '',
              Cart: 'cart',
              Profile: 'profile',
            },
          },
          ProductDetail: 'product/:id',
          Orders: 'orders',
          Checkout: {
            screens: {
              Address: 'checkout/address',
              Payment: 'checkout/payment',
              PaymentSuccess: 'checkout/success',
            },
          },
          Profile: 'account',
        },
      },
      Auth: {
        screens: {
          Login: 'login',
          Register: 'register',
        },
      },
    },
  },
};

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="App" component={AppNavigator} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
