// src/components/BannerCard.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { fonts } from '../assets/fonts/fonts';
import colors from '../constants/theme';
import images from '../assets/images';
import CustomText from './CustomText';
import CustomButton from './CustomButton';

const banners = [
  {
    id: 1,
    img: images.deal,
    textColor: '#000',
  },
];

export default function BannerCard() {
  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {banners.map((banner) => (
          <View key={banner.id} style={styles.card}>
            <ImageBackground
              source={banner.img}
              style={styles.imageBackground}
              imageStyle={styles.image}
            >
              <View style={styles.content}>
                {/* Top Line & Deals */}
                <View style={styles.textGroup}>
                  <View style={[styles.line, { borderColor: banner.textColor }]} />
                  <CustomText
                    style={[styles.dealText, { color: banner.textColor }]}
                  >
                    Deals
                  </CustomText>
                  <View style={[styles.line, { borderColor: banner.textColor }]} />
                </View>

                {/* Discount Text */}
                <CustomText
                  style={[styles.discountText, { color: banner.textColor }]}
                >
                  50% Off All Items
                </CustomText>

                {/* Shop Now Button */}
                <CustomButton
                  title="Shop Now"
                  onPress={() => {}}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 20,
  },

  card: {
    width: 370,
    height: 160,
    borderRadius: 30,
    position: 'relative',
    backgroundColor: colors.background,

    // Shadow (iOS + Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 5,
  },

  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },

  image: {
    borderRadius: 18,
    resizeMode: 'cover',
  },

  content: {
    paddingLeft: 170,
    paddingTop: 20,
    zIndex: 2,
  },

  textGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  line: {
    width: 22,
    height: 1,
    borderWidth: 1,
    marginHorizontal: 5,
  },

  dealText: {
    fontFamily: fonts.nunitoExtraBold,
    fontSize: 24,
  },

  discountText: {
    fontFamily: fonts.nunitoBold,
    fontSize: 18,
    marginBottom: 12,
  },

 button: {
  backgroundColor: colors.primary,
  borderRadius: 30,
  paddingVertical: 8,
  width: 100,
  alignItems: 'center', // Center text horizontally
  left:-30
},


  buttonText: {
    fontFamily: fonts.nunitoBold,
    fontSize: 14,
    color:colors.background,
  },
});
