import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useProduct, CartItem } from '../context/ProductContext';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import { fonts } from '../assets/fonts/fonts';
import colors from '../constants/theme';
import images from '../assets/images';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomTextInput from '../components/CustomTextInput';
type RootStackParamList = {
Home: undefined;
};
type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function CartScreen() {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const { cart, incrementWeight, decrementWeight, removeFromCart, clearCart } = useProduct();
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
const [deliveryAddress, setDeliveryAddress] = useState('');

  const getTotalCartPrice = () =>
    cart.reduce((acc, item) => acc + item.price * item.weight, 0).toFixed(2);

  const handleCheckout = () => {
    clearCart();
    setIsCheckedOut(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleContinueShopping = () => {
    setIsCheckedOut(false);
    navigation.navigate('Home');
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
         <Image source={images[item.image]} style={styles.image} />
 
      <View style={styles.info}>
        <CustomText style={styles.title}>{item.name}</CustomText>
        <CustomText style={styles.size}>14″</CustomText>
        <View style={styles.qtyContainer}>
          <TouchableOpacity style={styles.qtyButton} onPress={() => decrementWeight(item.id)}>
            <Icon name="remove" size={16} color="#FFF" />
          </TouchableOpacity>
          <CustomText style={styles.qtyText}>{item.weight}</CustomText>
          <TouchableOpacity style={styles.qtyButton} onPress={() => incrementWeight(item.id)}>
            <Icon name="add" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
        <CustomText style={styles.price}>${(item.price * item.weight).toFixed(2)}</CustomText>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
        <Icon name="close" size={18} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={colors.detail} />
        </TouchableOpacity>
        <CustomText style={styles.headerTitle}>Cart</CustomText>
        <CustomText style={styles.doneText}>DONE</CustomText>
      </View>

      {isCheckedOut ? (
        <Animated.View style={[styles.successScreen, { opacity: fadeAnim }]}>
          <Image source={require('../assets/images/checkout.png')} style={styles.successImage} resizeMode="contain" />
          <CustomText style={styles.successTitle}>Order Placed Successfully</CustomText>
          <CustomText style={styles.successDescription}>
            Thank you for your order! Continue shopping.
          </CustomText>
          <CustomButton
            title="Continue Shopping"
            style={styles.successButton}
            textStyle={styles.successButtonText}
            onPress={handleContinueShopping}
          />
        </Animated.View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 180 }}
            showsVerticalScrollIndicator={false}
          />

          {cart.length > 0 && (
            <View style={styles.footer}>
              <View style={styles.deliveryRow}>
                <CustomText style={styles.deliveryLabel}>DELIVERY ADDRESS</CustomText>
                <TouchableOpacity>
                  <CustomText style={styles.editText}>EDIT</CustomText>
                </TouchableOpacity>
              </View>
          <View style={styles.addressBox}>
  <CustomTextInput
    value={deliveryAddress}
    onChangeText={setDeliveryAddress}
    placeholder="Enter your delivery address"
    style={styles.addressInput}
    placeholderTextColor={colors.desc}
  />
</View>

              <View style={styles.totalRow}>
                <CustomText style={styles.totalLabel}>TOTAL:</CustomText>
                <CustomText style={styles.totalValue}>${getTotalCartPrice()}</CustomText>
              </View>
              <TouchableOpacity>
                <CustomText style={styles.breakdownText}>Breakdown</CustomText>
              </TouchableOpacity>
              <CustomButton
                title="PLACE ORDER"
                onPress={handleCheckout}
                style={styles.checkoutButton}
                textStyle={styles.checkoutButtonText}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.nunitoBold,
    color: colors.detail,
  },
  doneText: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: fonts.nunitoBold,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: colors.imgcontainer,
    marginRight: 12,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 14,
    marginRight: 12,
    backgroundColor: colors.imgcontainer,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.nunitoSemiBold,
    color: colors.productTitle,
  },
  size: {
    fontSize: 12,
    color: colors.desc,
    marginBottom: 4,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 14,
    color: colors.detail,
    fontFamily: fonts.nunitoRegular,
    marginHorizontal: 10,
  },
  price: {
    fontSize: 14,
    color: colors.detail,
    fontFamily: fonts.nunitoBold,
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: colors.background,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '110%',
    right: 5,
    borderTopColor: colors.borderBottomColor,
    borderTopWidth: 1,
  },
  deliveryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  deliveryLabel: {
    fontSize: 12,
    color: colors.desc,
    fontFamily: fonts.nunitoSemiBold,
  },
  editText: {
    fontSize: 12,
    color: colors.primary,
    fontFamily: fonts.nunitoSemiBold,
  },
addressBox: {
  marginBottom: 20,
  backgroundColor: colors.category,
  borderRadius: 12,
  paddingHorizontal: 10,
  paddingVertical: 6,
},

addressInput: {
  fontSize: 14,
  fontFamily: fonts.nunitoRegular,
  color: colors.text,
},

  addressText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: fonts.nunitoRegular,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: fonts.nunitoSemiBold,
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontFamily: fonts.nunitoBold,
    color: colors.text,
  },
  breakdownText: {
    color: colors.primary,
    fontSize: 12,
    fontFamily: fonts.nunitoSemiBold,
    alignSelf: 'flex-end',
    marginTop: 4,
    marginBottom: 14,
  },
  checkoutButton: {
    backgroundColor: colors.addtocart,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 14,
    color: colors.background,
    fontFamily: fonts.nunitoBold,
  },
  successScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  successImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: fonts.nunitoBold,
    color: colors.detail,
    textAlign: 'center',
    marginBottom: 10,
  },
  successDescription: {
    fontSize: 16,
    fontFamily: fonts.nunitoRegular,
    color: colors.desc,
    textAlign: 'center',
    marginBottom: 30,
  },
  successButton: {
    backgroundColor: colors.addtocart,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  successButtonText: {
    fontSize: 16,
    color: colors.background,
    fontFamily: fonts.nunitoBold,
  },
});
