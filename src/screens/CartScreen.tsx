import React from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useProduct, CartItem } from '../context/ProductContext';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import { fonts } from '../assets/fonts/fonts';
import images from '../assets/images';
import colors from '../constants/theme';

export default function CartScreen() {
  const { cart, incrementWeight, decrementWeight, removeFromCart } = useProduct();

  const getTotalCartPrice = () =>
    cart.reduce((acc, item) => acc + item.price * item.weight, 0).toFixed(2);

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={images[item.image]} style={styles.image} />
      <View style={styles.info}>
        <CustomText style={styles.title}>{item.name}</CustomText>
        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={() => decrementWeight(item.id)}>
            <Icon name="remove-circle-outline" size={22} color="#2F2E41" />
          </TouchableOpacity>
          <CustomText style={styles.qtyText}>{item.weight} lb</CustomText>
          <TouchableOpacity onPress={() => incrementWeight(item.id)}>
            <Icon name="add-circle-outline" size={22} color="#2F2E41" />
          </TouchableOpacity>
        </View>
        <CustomText style={styles.price}>
          ${(item.price * item.weight).toFixed(2)}
        </CustomText>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <Icon name="trash-outline" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomText style={styles.header}>My Cart</CustomText>

      {cart.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="cart-outline" size={64} color="#ccc" />
          <CustomText style={styles.emptyText}>Your cart is empty.</CustomText>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />

          <View style={styles.totalRow}>
            <CustomText style={styles.totalLabel}>Total:</CustomText>
            <CustomText style={styles.totalValue}>${getTotalCartPrice()}</CustomText>
          </View>
          <CustomButton
            title="Proceed to Checkout"
            onPress={() => {}}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor:colors.background,
  },
  header: {
    fontSize: 24,
    fontFamily: fonts.nunitoExtraBold,
    marginBottom: 20,
    color:colors.primary,
  },
  listContent: {
    paddingBottom: 150,
  },
  button: {
  backgroundColor: colors.primary,
  borderRadius: 30,
  paddingVertical: 14,
  paddingHorizontal: 32,
  alignSelf: 'center',
  marginTop: 16,
  width: '90%',
},

buttonText: {
  fontFamily: fonts.nunitoBold,
  fontSize: 16,
  color: '#fff',
  textAlign: 'center',
},

  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:colors.imgcontainer,
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 12,
    resizeMode: 'contain',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.nunitoSemiBold,
    color: colors.primary,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  qtyText: {
    fontSize: 14,
    fontFamily: fonts.nunitoRegular,
    marginHorizontal: 8,
    color: colors.primary,
  },
  price: {
    fontSize: 14,
    fontFamily: fonts.nunitoSemiBold,
    color: colors.primary,
  },
  totalRow: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:colors.primary,
    padding: 15,
    borderRadius: 12,
  },
  totalLabel: {
    color: '#fff',
    fontSize: 18,
    fontFamily: fonts.nunitoSemiBold,
  },
  totalValue: {
    color: '#fff',
    fontSize: 18,
    fontFamily: fonts.nunitoSemiBold,
  },
  checkoutBtn: {
    height: 48,
    borderRadius: 10,
    marginBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#999',
    fontFamily: fonts.nunitoRegular,
  },
});
