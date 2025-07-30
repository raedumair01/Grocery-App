import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomShapeSvg from '../assets/icons/BasketSvg';
import RightSideShapeSvg from '../assets/icons/RightSideShapeSvg';
import HeartBasketSvg from '../assets/icons/CarrotSvg';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import images from '../assets/images/index';
import { slides, SlideType } from '../data/onboardingSlides';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import colors from '../constants/theme';
import { fonts } from '../assets/fonts/fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width, height } = Dimensions.get('window');

const scale = (size: number) => (width / 375) * size;

type OnboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;
type RootStackParamList = {
  Signup: undefined;
};

export default function BasketScreen() {
  const navigation = useNavigation<OnboardScreenNavigationProp>();
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Type for the current index
  const flatListRef = useRef<FlatList>(null);

  // Scroll event handler to update the current index
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNextPress = (): void => {
    if (currentIndex === slides.length - 1) {
      navigateToSignup();
    } else {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const navigateToSignup = (): void => {
    navigation.navigate('Signup');
  };

  const renderSlideItem = ({ item }: { item: SlideType }) => (
    <View style={styles.slide}>
      <Image
        source={item.image}
        resizeMode="contain"
        style={styles.illustration}
      />
      <CustomText style={styles.heading}>{item.title}</CustomText>
      <CustomText style={styles.description}>{item.description}</CustomText>
    </View>
  );

  const nextButtonTitle: string = currentIndex === slides.length - 1 
    ? "Let's Get Started" 
    : 'Next';

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Basket</CustomText>

      <View style={styles.basketRow}>
        <Image source={images.basket1} style={styles.basketImage} />
        <HeartBasketSvg size={scale(60)} style={styles.basketSvg} />
        <Image source={images.basket2} style={styles.basketImage2} />
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        snapToAlignment="center"
        contentContainerStyle={styles.sliderContainer}
        decelerationRate="fast"
        renderItem={renderSlideItem}
      />

      <View style={styles.dots}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={index === currentIndex ? styles.dotActive : styles.dot}
          />
        ))}
      </View>

      <BottomShapeSvg style={styles.bottomShape} />
      <RightSideShapeSvg style={styles.bottomShape2} />

      <CustomButton
        title={nextButtonTitle} 
        onPress={handleNextPress}
        style={styles.nextButton}
      />

      <TouchableOpacity onPress={navigateToSignup}>
        <CustomText style={styles.skip}>Skip</CustomText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingTop: hp('10%'),  // responsive top padding
    paddingHorizontal: wp('5%'), // responsive horizontal padding
  },
  title: {
    fontSize: scale(36),  // reduced font size using scale
    color: colors.primary,
    fontFamily: fonts.nunitoExtraBold,
  },
  basketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('80%'),  // responsive width
    alignItems: 'center',
    marginBottom: hp('4%'), // responsive margin bottom
  },
  basketImage: {
    width: scale(50),  // scaled down width
    height: scale(55), // scaled down height
    resizeMode: 'contain',
    left: -scale(10),  // scaled left margin
  },
  basketImage2: {
    width: scale(50),  // scaled down width
    height: scale(55), // scaled down height
    resizeMode: 'contain',
    left: scale(15),  // scaled left margin
  },
  basketSvg: {
    position: 'absolute',
    left: wp('35%'),  // responsive position
    bottom: hp('-2%'), // responsive bottom
  },
  sliderContainer: {
    paddingHorizontal: wp('10%'),  // responsive horizontal padding
  },
  slide: {
    width: wp('85%'),  // responsive width
    height: hp('40%'),  // responsive height
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: scale(220),  // scaled down width
    height: scale(220),  // scaled down height
    marginBottom: hp('-10%'),
    bottom:hp('3%') // responsive margin bottom
  },
  heading: {
    fontSize: scale(18),  // scaled down font size
    textAlign: 'center',
    bottom: hp('-10%'), // responsive bottom
    fontFamily: fonts.nunitoExtraBold,
    color: colors.primary,
  },
 description: {
  fontSize: scale(12),  // scaled down font size
  textAlign: 'center',
  paddingHorizontal: wp('10%'), // responsive horizontal padding
  lineHeight: hp('2.5%'),  // responsive line height
  fontFamily: fonts.nunitoMedium,
  color: colors.primary,
  bottom: hp('-11%'), // responsive bottom
  maxHeight: hp('7%'),  // Allow a maximum height for the 2-3 lines of text
  textAlignVertical: 'top',  // align text to the top for better readability
},
  dots: {
    flexDirection: 'row',
    marginVertical: hp('3%'), 
        bottom:hp('6%') // responsive margin bottom
 // responsive margin vertical
  },
  dot: {
    width: scale(8),  // scaled down width
    height: scale(8),  // scaled down height
    borderRadius: scale(4),  // scaled down border radius
    backgroundColor: colors.dot,
    marginHorizontal: wp('2%'),  // responsive horizontal margin
    bottom: hp('12%'),  // responsive bottom
  },
  dotActive: {
    width: scale(10),  // scaled down width
    height: scale(10),  // scaled down height
    borderRadius: scale(5),  // scaled down border radius
    backgroundColor: colors.primary,
    marginHorizontal: wp('2%'),  // responsive horizontal margin
    bottom: hp('12%'),  // responsive bottom
  },
  nextButton: {
    position: 'absolute',
    bottom: hp('10%'),  // responsive bottom
    width: wp('75%'),
    height: wp('15%'),
  },
  skip: {
    color: colors.primary,
    fontSize: scale(14),  // scaled down font size
    fontFamily: fonts.nunitoBold,
    position: 'absolute',
    bottom: hp('5%'),  // responsive bottom
    alignSelf: 'center',
  },
  bottomShape: {
    position: 'absolute',
    left: 0,
    bottom: hp('40%'),  // responsive bottom
    width: wp('15%'),  // responsive width
    height: hp('15%'),  // responsive height
  },
  bottomShape2: {
    position: 'absolute',
    left: wp('90%'),  // responsive left
    bottom: hp('20%'),  // responsive bottom
  },
});
