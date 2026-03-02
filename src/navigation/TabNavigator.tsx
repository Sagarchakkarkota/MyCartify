import Ionicons from '@react-native-vector-icons/ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTheme } from '../hooks/useTheme';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: '#9ca3af',
        // tabBarStyle: { backgroundColor: theme.card },
        tabBarIcon: ({ color, size }) => {
          let iconName: string = 'home';
          // if (route.name === 'Wishlist') iconName = 'heart';
          if (route.name === 'Cart') {
            iconName = 'cart';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Wishlist" component={WishlistScreen} /> */}
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
