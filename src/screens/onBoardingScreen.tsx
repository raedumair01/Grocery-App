import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
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

const { width } = Dimensions.get('window');
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
        <HeartBasketSvg size={60} style={styles.basketSvg} />
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
    backgroundColor:colors.background,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 54,
    color:colors.primary,
    fontFamily:fonts.nunitoExtraBold,
  },
  basketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
    marginBottom: 30,
  },
  basketImage: {
    width: 73,
    height: 78,
    resizeMode: 'contain',
    left: -20,
  },
  basketImage2: {
    width: 73,
    height: 78,
    resizeMode: 'contain',
    left: 10,
  },
  basketSvg: {
    position: 'absolute',
    left: 120,
    bottom: -10,
  },
  sliderContainer: {
    paddingHorizontal: (width - 350) / 2,
  },
  slide: {
    width: 320,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: 250,
    height: 250,
    marginBottom: -90,
  },
  heading: {
    fontSize: 22,
    textAlign: 'center',
    bottom: -100,
    fontFamily:fonts.nunitoExtraBold,
    color:colors.primary
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 20,
    fontFamily:fonts.nunitoMedium,
    color: colors.primary,
    bottom: -110,
  },
  dots: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor:colors.dot,
    marginHorizontal: 5,
    bottom: 150,
  },
  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor:colors.primary,
    marginHorizontal: 5,
    bottom: 150,
  },
  nextButton: {
    position: 'absolute',
    bottom: 80,
    width: '80%',
  },
  skip: {
    color:colors.primary,
    fontSize: 14,
    fontFamily:fonts.nunitoBold,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  bottomShape: {
    position: 'absolute',
    left: 0,
    bottom: 360,
    width: 70,
    height: 103,
  },
  bottomShape2: {
    position: 'absolute',
    left: 370,
    bottom: 170,
  },
});
