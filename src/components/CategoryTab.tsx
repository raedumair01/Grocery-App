// src/components/CategoryTab.tsx
import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { useProduct } from '../context/ProductContext';
import CustomText from './CustomText';
import colors from '../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Product from '../data/products';
import { fonts } from '../assets/fonts/fonts';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type Props = {
  category: string;
};

export default function CategoryTab({ category }: Props) {
  const filteredProducts = Product.filter((item) => item.category === category);
  const { setSelectedProduct, addToCart } = useProduct();

  return (
    <FlatList
      data={filteredProducts}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
        >
          <View style={styles.cardBackground} />

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setSelectedProduct(item);
              addToCart();
            }}
          >
            <Icon name="add" size={20} color={colors.background} />
          </TouchableOpacity>

          <Image source={item.img} style={styles.productImage} />
          <CustomText style={styles.productTitle}>{item.title}</CustomText>

          <View style={styles.labelContainer}>
            <CustomText style={styles.labelText}>1lb, Price</CustomText>
          </View>

          <CustomText style={styles.price}>{item.price}</CustomText>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  card: {
    width: 173.32,
    height: 248.51,
    marginRight: 15,
    borderRadius: 18,
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  cardBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.card,
    borderRadius: 18,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 40,
  },
  productTitle: {
    position: 'absolute',
    top: 170,
    left: 16,
    width: 137,
    fontFamily: fonts.nunitoExtraBold,
    fontSize: 12,
    lineHeight: 20,
    color: colors.productTitle,
  },
  labelContainer: {
    position: 'absolute',
    top: 205,
    left: 16,
    width: 83,
    height: 22,
    backgroundColor: colors.labelContainer,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    fontFamily: fonts.nunitoBold,
    fontSize: 11,
    color: colors.background,
  },
  price: {
    position: 'absolute',
    top: 225,
    left: 117,
    fontFamily: fonts.nunitoBold,
    fontSize: 12,
    color: colors.productTitle,
  },
  addButton: {
    position: 'absolute',
    top: 18,
    left: 119,
    width: 36,
    height: 36,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
