import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import { useAuthStore } from '../store/authStore';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated());
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      {isAuthenticated && (
        <Stack.Screen name="Orders" component={OrdersScreen} />
      )}
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
