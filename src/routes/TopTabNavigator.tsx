// src/navigation/TopTabNavigator.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CategoryTab from '../components/CategoryTab';
import colors from '../constants/theme';
import { fonts } from '../assets/fonts/fonts';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Tab = createMaterialTopTabNavigator();

// Custom Label Component
const TabLabel = ({ focused, title }: { focused: boolean; title: string }) => {
  return (
    <View style={[styles.categoryChip, focused && styles.activeChip]}>
      <Text style={[styles.categoryText, focused && styles.activeText]}>
        {title}
      </Text>
    </View>
  );
};

export default function TopTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarShowLabel: true,
        tabBarItemStyle: {
          width: 'auto',
          paddingHorizontal: 0,
          marginHorizontal: 0,
        },
        tabBarLabel: ({ focused, children }) => (
          <TabLabel focused={focused} title={children as string} />
        ),
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent',
        },
        tabBarStyle: {
          backgroundColor: colors.background,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen name="Popular">
        {() => <CategoryTab category="Popular" />}
      </Tab.Screen>
      <Tab.Screen name="Fruits">
        {() => <CategoryTab category="Fruits" />}
      </Tab.Screen>
      <Tab.Screen name="Veggie">
        {() => <CategoryTab category="Veggie" />}
      </Tab.Screen>
      <Tab.Screen name="Spices">
        {() => <CategoryTab category="Spices" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
 categoryChip: {
  minWidth: 100, // ← Add this to increase tab width
  paddingHorizontal: 14,
  paddingVertical: 6,
  backgroundColor: colors.category,
  borderRadius: 10,
  marginHorizontal: 5,
  alignItems: 'center', // centers the label inside
},
  activeChip: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    color: colors.primary,
    fontFamily: fonts.nunitoSemiBold,
    fontSize: wp('3%'),
  },
  activeText: {
    color: colors.background,
    fontFamily: fonts.nunitoBold,
  },
});
