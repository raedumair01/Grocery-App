import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BasketScreen from '../screens/onBoardingScreen';
import SignupScreen from '../screens/SignupScreen'
import LoginScreen from '../screens/LoginScreen';
import BottomNavigation from './BottomNavigation';
import ProductDetailScreen from '../screens/DetailsScreen';
import { ProductProvider } from '../context/ProductContext'; 
import { UserProvider } from '../context/UserContext';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <UserProvider>
    <ProductProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Basket"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Basket" component={BasketScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Maintabs" component = {BottomNavigation}/>
        <Stack.Screen name="Details" component = {ProductDetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </ProductProvider>
    </UserProvider>
  );
}
