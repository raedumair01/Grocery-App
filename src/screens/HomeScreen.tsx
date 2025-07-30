import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import colors from '../constants/theme';
import { fonts } from '../assets/fonts/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import images from '../assets/images';
import BannerCard from '../components/BannerCard';
import { useNavigation } from '@react-navigation/native'; 
import { useProduct } from '../context/ProductContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Product from '../data/products';
import { useUser } from '../context/UserContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Product = {
  id: string;
  title: string;
  price: string;
  img: any;
  imgKey: string;
  calories: string;
  rating: number;
  reviews: number;
};

export type RootStackParamList = {
  Home: undefined; 
  Details: undefined;
};
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Details'>;

const categories = ['Popular', 'Fruits', 'Veggie', 'Spices'];
export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [search, setSearch] = useState('');
  const navigation = useNavigation<HomeScreenNavigationProp>();
const { setSelectedProduct, addToCart} = useProduct();
  const { user } = useUser();
 const navigateToProductDetail = (product: Product) => {
    setSelectedProduct(product);
    navigation.navigate('Details');
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <CustomText style={styles.welcome}>Welcome Back,</CustomText>
            <CustomText style={styles.fullName}> {user?.fullName}</CustomText>
          </View>
          <Image source={images.profile} style={styles.profileImage} />
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
  <View style={styles.searchBar}>
    <Icon name="search-outline" size={20} color={colors.secondary} />
    <CustomTextInput
  value={search}
  onChangeText={setSearch}
  placeholder="Search here..."
  variant="search"
/>
    <TouchableOpacity>
      <Icon name="options-outline" size={20} color={colors.secondary} />
    </TouchableOpacity>
  </View>
</View>
        <View style={styles.categoryContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[styles.categoryChip, selectedCategory === cat && styles.activeChip]}>
              <CustomText
                style={[styles.categoryText, selectedCategory === cat && styles.activeText]}>
                {cat}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>
       
        <BannerCard />
        <View style={styles.offerHeader}>
          <CustomText style={styles.offerTitle}>Exclusive Offer</CustomText>
          <TouchableOpacity>
            <CustomText style={styles.seeAll}>See all</CustomText>
          </TouchableOpacity>
        </View>
        <FlatList
          data={Product}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            
           <TouchableOpacity onPress={() => navigateToProductDetail(item)} style={styles.card}>
           
              <View style={styles.cardBackground} />
              <TouchableOpacity
                  style={styles.addButton}
                 onPress={() => {
                setSelectedProduct(item); 
               addToCart(); 
              }}
                >
            <Icon name="add" size={20} color="#fff" />
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop:40
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  welcome: {
    color: colors.secondary,
    fontSize:wp('5%'),
  },
  fullName: {
    fontSize:wp('6%'),
    fontFamily: fonts.nunitoBold,
    color: colors.primary,
  },
  profileImage: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: 50,
  },
 searchContainer: {
  paddingHorizontal: 20,
  marginBottom: 15,
},

searchBar: {
  flexDirection: 'row',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomColor:colors.borderBottomColor,
  paddingBottom: 4,
},

  filterIcon: {
    marginLeft: 10,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
  },
  offerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  offerTitle: {
    fontFamily: fonts.nunitoExtraBold,
    fontSize:wp('5%'),
    color: colors.primary,
  },
  seeAll: {
    fontFamily: fonts.nunitoBold,
    fontSize:wp('3.5%'),
    color: colors.primary,
  },

  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor:colors.category,
    borderRadius: 10,
    marginRight: 10,
  },
  activeChip: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    color: colors.primary,
    fontFamily: fonts.nunitoSemiBold,
    fontSize:wp('3%')

  },
  activeText: {
    color:colors.background,
    fontFamily:fonts.nunitoBold
  },

  card: {
    width: 173.32,
    height: 248.51, 
    marginRight: 15,
    position: 'relative',
    borderRadius: 18,
    backgroundColor: colors.background,
    paddingBottom: 30, 
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },

  cardBackground: {
    position: 'absolute',
    width: 173.32,
    height: 248.51,
    backgroundColor:colors.card,
    borderRadius: 18,
    top: 0,
    left: 1,
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
    width: 137.02,
    fontFamily: fonts.nunitoExtraBold,
    fontSize:wp('3%'),
    lineHeight: 20,
    color: colors.productTitle,
  },

  labelContainer: {
    position: 'absolute',
    top: 205,
    left: 16,
    width: 83,
    height: 22,
    backgroundColor:colors.labelContainer,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  labelText: {
    fontFamily: fonts.nunitoRegular,
    fontSize:wp('2.5%'),
    color: colors.background,
  },

  price: {
    position: 'absolute',
    top:wp('50%'),
    left: 117,
    fontFamily: fonts.nunitoBold,
    fontSize:wp('3%'),
    color: colors.productTitle,
    
  },

  addButton: {
    position: 'absolute',
    top: 18,
    left: 119,
    width: 36,
    height: 36,
    backgroundColor:colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  shadowBlur: {
    position: 'absolute',
    width: 168,
    height: 10,
    left: 4,
    top: 235,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
});

