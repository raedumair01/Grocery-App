import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CartScreen from '../screens/CartScreen';
import colors from '../constants/theme';

const Tab = createBottomTabNavigator();
export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName = '';

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Search':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Notifications':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            case 'Cart':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
          }

          return (
            <View style={styles.iconWrapper}>
              <Ionicons
                name={iconName}
                size={22}
                color={focused ? '#fff' : colors.secondary}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  iconWrapper: {
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  marginTop: 16,
},

});
