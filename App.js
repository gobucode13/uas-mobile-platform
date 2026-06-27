// App.js — Entry point
// Install dependencies:
//   npx expo install react-native-svg
//   npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './src/context/CartContext';

import SplashScreen   from './src/screens/SplashScreen';
import LoginScreen    from './src/screens/LoginScreen';
import HomeScreen     from './src/screens/HomeScreen';
import DetailScreen   from './src/screens/DetailScreen';
import CartScreen     from './src/screens/CartScreen';
import SuccessScreen  from './src/screens/SuccessScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
            <Stack.Screen name="Splash"   component={SplashScreen} />
            <Stack.Screen name="Login"    component={LoginScreen} />
            <Stack.Screen name="Home"     component={HomeScreen} />
            <Stack.Screen name="Detail"   component={DetailScreen} />
            <Stack.Screen name="Cart"     component={CartScreen} />
            <Stack.Screen name="Success"  component={SuccessScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}
