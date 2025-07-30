import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import CountryPicker, {CountryCode, Country} from 'react-native-country-picker-modal';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import { fonts } from '../assets/fonts/fonts';
import { LargeHeartBasketSvg } from '../assets/icons/CarrotSvg';
import HeartBasketSvg from '../assets/icons/CarrotSvg';
import BottomShapeSvg from '../assets/icons/BasketSvg';
import RightSideShapeSvg from '../assets/icons/RightSideShapeSvg';
import colors from '../constants/theme';
import CustomTextInput from '../components/CustomTextInput';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUser } from '../context/UserContext';

type RootStackParamList = {
  Login: undefined;
  Maintabs: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


type ErrorState = {
  fullName?: string;
  email?: string;
  phone?: string;
  agree?: string;
};
export default function CreateAccountScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [agree, setAgree] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>('US');
  const [country, setCountry] = useState<Country | null>(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const { setUser } = useUser(); 

  const [errors, setErrors] = useState<ErrorState>({});


  const handleCountrySelect = (selectedCountry: Country) => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
    setPickerVisible(false);
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { fullName: '', email: '', phone: '', agree: '' };

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }
if (!phone.trim()) {
  newErrors.phone = 'Phone number is required';
  isValid = false;
} else if (!/^\d+$/.test(phone)) {
  newErrors.phone = 'Phone number must contain only digits';
  isValid = false;
} else if (phone.length < 10 || phone.length > 15) {
  newErrors.phone = 'Phone number must be between 10 and 15 digits';
  isValid = false;
}


    if (!agree) {
      newErrors.agree = 'You must agree to continue';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <View style={styles.container}>
      <LargeHeartBasketSvg size={171} style={styles.bigcarrot} />
      <CustomText style={styles.title}>Basket</CustomText>

      <CustomText style={styles.header}>Create an Account</CustomText>
      <HeartBasketSvg size={63} style={styles.bigcarrot2} />

      <CustomText style={styles.subtext}>Please type your information</CustomText>

      <CustomTextInput
        placeholder="Full Name"
        style={[styles.input, fullName.length === 0 && styles.boldPlaceholder]}
        value={fullName}
        onChangeText={setFullName}
        placeholderTextColor="#999"
      />
      {errors.fullName ? <CustomText style={styles.errorText}>{errors.fullName}</CustomText> : null}

      <CustomTextInput
        placeholder="Email Address"
        style={[styles.input, email.length === 0 && styles.boldPlaceholder]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#999"
      />
      {errors.email ? <CustomText style={styles.errorText}>{errors.email}</CustomText> : null}

      <CustomTextInput
        placeholder="Password"
        style={[styles.input, password.length === 0 && styles.boldPlaceholder]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />

      <View style={styles.phoneContainer}>
        <View style={styles.countryPickerWrapper}>
          <TouchableOpacity onPress={() => setPickerVisible(true)} style={styles.countryButton}>
            <CustomText style={styles.code}>
              +{country?.callingCode?.[0] || '1'}
            </CustomText>
          </TouchableOpacity>
          <CountryPicker
            countryCode={countryCode}
            withFilter
            withFlag
            withCallingCode
            withEmoji
            visible={pickerVisible}
            onSelect={handleCountrySelect}
            onClose={() => setPickerVisible(false)}
          />
        </View>
        <CustomTextInput
          style={[styles.phoneInput, phone.length === 0 && styles.boldPlaceholder]}
          placeholder="000-00-0000"
          value={phone}
          onChangeText={(text) => {
  const numericText = text.replace(/[^0-9]/g, '');
  setPhone(numericText);
}}
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />
      </View>
      {errors.phone ? <CustomText style={styles.errorText}>{errors.phone}</CustomText> : null}

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={agree}
          onValueChange={setAgree}
          tintColors={{ true: '#2F2E41', false: '#999' }}
          boxType={Platform.OS === 'ios' ? 'square' : undefined}
          onCheckColor="#fff"
          onFillColor={colors.primary}
          onTintColor={colors.primary}
          style={styles.checkbox}
        />
        <CustomText style={styles.agreeText}>
          By joining I agree to receive emails from Geeta.
        </CustomText>
      </View>
      {errors.agree ? <CustomText style={styles.errorText}>{errors.agree}</CustomText> : null}

      <BottomShapeSvg style={styles.bottomShape} />
      <RightSideShapeSvg style={styles.bottomShape2} />

      <CustomButton
        title="Create Account"
        onPress={() => {
          if (validateInputs()) {
            console.log('All inputs valid:', { fullName, email, phone, password });
             navigation.navigate('Maintabs')
             setUser({ fullName }); 
          }
        }}
        style={styles.createBtn}
      />

      <CustomText style={styles.footerText}>
        Already have an account?{' '}
        <CustomText style={styles.signIn} onPress={() => navigation.navigate('Login')}>
          Sign In
        </CustomText>
      </CustomText>
    </View>
  );
}

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
  input: {
    height: 52,
    borderRadius: 10,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
    fontFamily: fonts.nunitoRegular,
    color: colors.text,
  },
  boldPlaceholder: {
    color: colors.primary,
    fontFamily: fonts.nunitoBold,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginBottom: 6,
    marginTop: -6,
    fontFamily: fonts.nunitoRegular,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  countryPickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    height: 52,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  countryButton: {
    paddingRight: 6,
    justifyContent: 'center',
  },
  code: {
    fontSize: 16,
    fontFamily: fonts.nunitoBold,
    color: colors.primary,
  },
  phoneInput: {
    flex: 1,
    height: 52,
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: fonts.nunitoRegular,
    color: colors.text,
    bottom:-8,
    lineHeight:20
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  checkbox: {
    width: 22,
    height: 22,
  },
  agreeText: {
    fontSize: 13,
    marginLeft: 10,
    color: colors.secondary,
    fontFamily: fonts.nunitoRegular,
    flex: 1,
    flexWrap: 'wrap',
  },
  createBtn: {
    marginVertical: 12,
    width:'100%',

  },
  footerText: {
    fontSize: 14,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: fonts.nunitoRegular,
  },
  signIn: {
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
});
