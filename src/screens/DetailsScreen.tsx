import React, { useState } from 'react'; 
import { View, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../components/CustomText';
import colors from '../constants/theme';
import { fonts } from '../assets/fonts/fonts';
import images from '../assets/images';
import CaloriesIcon from '../assets/icons/CaloriesSvg';
import RatingIcon from '../assets/icons/RatingSvg';
import ReviewsIcon from '../assets/icons/Reviews';
import { useProduct } from '../context/ProductContext';
import { useNavigation } from '@react-navigation/native';
import CartIcon from '../assets/icons/CartIcon';

export default function ProductDetailScreen() {
  const { product, incrementWeight, decrementWeight, totalPrice } = useProduct();
const { addToCart } = useProduct();
const navigation = useNavigation();

const [added, setAdded] = useState(false); 
const handleAddToCart = () => {
  addToCart();
  setAdded(true);
  setTimeout(() => setAdded(false), 2000);
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topRow}>
<TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
  <Ionicons name="arrow-back" size={20} color="#fff" />
</TouchableOpacity>

         <View style={styles.weightContainer}>
  <TouchableOpacity onPress={() => decrementWeight()}>
    <Ionicons name="remove" size={14} color="#fff" />
  </TouchableOpacity>
  <CustomText style={styles.weightText}>{product.weight} LB</CustomText>
  <TouchableOpacity onPress={() => incrementWeight()}>
    <Ionicons name="add" size={14} color="#fff" />
  </TouchableOpacity>
</View>

        </View>

        <View style={styles.imageContainer}>
          <Image
            source={images[product.image]}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.detailSection}>
          <View style={styles.titleRow}>
            <CustomText style={styles.productName}>{product.name}</CustomText>
            <CustomText style={styles.productPrice}>${product.price}</CustomText>
          </View>

          <View style={styles.horizontalLine} />

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <CaloriesIcon />
              <CustomText style={styles.metricText}>{product.calories}</CustomText>
            </View>
            <View style={styles.metricItem}>
              <RatingIcon />
              <CustomText style={styles.metricText}>{product.rating}</CustomText>
            </View>
            <View style={styles.metricItem}>
              <ReviewsIcon />
              <CustomText style={styles.metricText}>{product.reviews} Reviews</CustomText>
            </View>
          </View>

          <View style={styles.horizontalLine} />

          <View style={styles.descriptionContainer}>
            <CustomText style={styles.sectionTitle}>Description</CustomText>
            <CustomText style={styles.descriptionText}>{product.description}
              <CustomText style={styles.detailLink}>detail</CustomText>
            </CustomText>
          </View>

          <View style={styles.bottomRow}>
            <CustomText style={styles.totalPrice}>${totalPrice}</CustomText>
          <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
            <CartIcon/>
  <CustomText style={styles.addToCartText}>
    {added ? 'Added!' : 'Add to Cart'}
  </CustomText>
</TouchableOpacity>


          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:colors.imgcontainer,
  },
  container: {
    flex: 1,
    backgroundColor:colors.imgcontainer,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 32,
    alignItems: 'center',
  },
  iconButton: {
    backgroundColor:colors.primary,
    padding: 14,
    borderRadius: 12,
  },
  weightContainer: {
    backgroundColor:colors.primary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  weightText: {
    fontFamily: fonts.nunitoBold,
    fontSize: 14,
    color: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  productImage: {
    width: 280,
    height: 280,
  },
  detailSection: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 20,
    marginTop: 20,
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  productName: {
    fontSize: 20,
    fontFamily: fonts.nunitoBold,
    color: colors.primary,
  },
  productPrice: {
    fontSize: 18,
    fontFamily: fonts.nunitoBold,
    color: '#000',
  },
  horizontalLine: {
    borderBottomColor:colors.imgcontainer,
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginBottom: 8,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricText: {
    fontSize: 14,
    fontFamily: fonts.nunitoRegular,
    color: colors.primary,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: fonts.nunitoBold,
    color:colors.detail,
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 13,
    fontFamily: fonts.nunitoRegular,
    color:colors.desc,
    lineHeight: 20,
  },
  detailLink: {
    color: colors.primary,
    fontFamily: fonts.nunitoBold,
  },
  bottomRow: {
    backgroundColor:colors.primary,
    borderRadius: 16,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  totalPrice: {
    fontSize: 24,
    fontFamily: fonts.nunitoExtraBold,
    color: '#fff',
  },
  addToCartBtn: {
    backgroundColor:colors.addtocart,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 15,
    fontFamily: fonts.nunitoExtraBold,
    color: '#fff',
    marginLeft: 10,
  },
});
