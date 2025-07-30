import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { fonts } from '../assets/fonts/fonts';
import colors from '../constants/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Variant = 'default' | 'search';

type CustomTextInputProps = TextInputProps & {
  value: string;
  onChangeText: (text: string) => void;
  variant?: Variant;
};

export default function CustomTextInput({
  value,
  onChangeText,
  style,
  variant = 'default',
  ...rest
}: CustomTextInputProps) {
  const isSearch = variant === 'search';

  const inputStyle = [
    isSearch ? styles.searchInput : styles.input,
    value.length === 0 && styles.boldPlaceholder,
    style as ViewStyle | TextStyle,
  ];

  return (
    <TextInput
      style={inputStyle}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={isSearch ? colors.secondary : '#999'}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 52,
    borderRadius: 10,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 16,
    marginBottom: 15,
    fontFamily: fonts.nunitoRegular,
    color: colors.text,
  },
  boldPlaceholder: {
    fontFamily: fonts.nunitoBold,
    color: colors.primary,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: fonts.nunitoRegular,
    color: colors.primary,
    paddingVertical: 0,
  },
});
