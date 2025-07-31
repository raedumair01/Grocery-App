import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../components/CustomText';
import colors from '../constants/theme';
import { fonts } from '../assets/fonts/fonts';

// Sample notification data
const notifications = [
  {
    id: '1',
    title: 'Order Placed',
    message: 'Your order #1234 has been placed successfully.',
    time: 'Just now',
    icon: 'checkmark-done-outline',
  },
  {
    id: '2',
    title: 'Delivery Update',
    message: 'Your order is out for delivery!',
    time: '2 hours ago',
    icon: 'bicycle-outline',
  },
  {
    id: '3',
    title: 'Promo Offer',
    message: '20% off on your next purchase. Limited time!',
    time: '1 day ago',
    icon: 'pricetag-outline',
  },
];

export default function NotificationScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderItem = ({ item }: { item: typeof notifications[0] }) => (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={22} color={colors.primary} />
      </View>
      <View style={styles.content}>
        <CustomText style={styles.title}>{item.title}</CustomText>
        <CustomText style={styles.message}>{item.message}</CustomText>
        <CustomText style={styles.time}>{item.time}</CustomText>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomText style={styles.header}>Notifications</CustomText>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
  },
  header: {
    fontSize: 24,
    fontFamily: fonts.nunitoBold,
    color: colors.primary,
    marginLeft: 20,
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconContainer: {
    backgroundColor: colors.imgcontainer,
    borderRadius: 10,
    padding: 10,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.nunitoSemiBold,
    color: colors.productTitle,
  },
  message: {
    fontSize: 14,
    fontFamily: fonts.nunitoRegular,
    color: colors.desc,
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    fontFamily: fonts.nunitoLight,
    color: colors.secondary,
    marginTop: 4,
  },
});
