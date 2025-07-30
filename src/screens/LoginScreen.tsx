import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import { LargeHeartBasketSvg } from '../assets/icons/CarrotSvg';
import BottomShapeSvg from '../assets/icons/BasketSvg';
import RightSideShapeSvg from '../assets/icons/RightSideShapeSvg';
import { fonts } from '../assets/fonts/fonts';
import colors from '../constants/theme';
import images from '../assets/images';
import CustomTextInput from '../components/CustomTextInput';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type LoginErrors = {
  email?: string;
  password?: string;
};
type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Maintabs: undefined;
};


const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});

  const validate = () => {
    const newErrors: LoginErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validate()) {
      console.log('Logging in with:', { email, password });
      navigation.navigate('Maintabs');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <LargeHeartBasketSvg size={171} style={styles.bigcarrot} />
      <CustomText style={styles.title}>Basket</CustomText>

      <Image source={images.login} style={styles.image} resizeMode="contain" />

      <CustomText style={styles.header}>Log In</CustomText>
      <CustomText style={styles.subtext}>Please type your information</CustomText>

      <CustomTextInput
        placeholder="Email Address"
        placeholderTextColor="#999"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) validate();
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <CustomTextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) validate();
        }}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <BottomShapeSvg style={styles.bottomShape} />
      <RightSideShapeSvg style={styles.bottomShape2} />

      <CustomButton title="Log In" onPress={handleLogin} style={styles.loginButton} />

      <CustomText style={styles.footerText}>
        New user?{' '}
        <CustomText style={styles.signUp} onPress={() => navigation.navigate('Signup')}>
          Create an Account
        </CustomText>
      </CustomText>
    </View>
  );
};



export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  title: {
    fontSize: 54,
    fontFamily: fonts.nunitoExtraBold,
    color: colors.primary,
    alignSelf: 'center',
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontFamily: fonts.nunitoExtraBold,
    color: colors.primary,
    alignSelf: 'center',
  },
  subtext: {
    fontSize: 14,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: fonts.nunitoRegular,
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: fonts.nunitoRegular,
    marginBottom: 8,
    marginLeft: 4,
  },
  loginButton: {
    marginVertical: 12,
    width: '80%',
    alignSelf: 'center',
  },
  footerText: {
    fontSize: 14,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: fonts.nunitoRegular,
  },
  signUp: {
    fontFamily: fonts.nunitoBold,
    color: colors.primary,
  },
  bigcarrot: {
    position: 'absolute',
    top: 100,
  },
  bigcarrot2: {
    position: 'absolute',
    bottom: 580,
    right: 180,
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
  image: {
    width: '100%',
    height: 200,
    marginVertical: 20,
  },
});
