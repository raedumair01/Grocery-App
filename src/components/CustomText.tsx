import React, { ReactNode } from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { fonts } from '../assets/fonts/fonts';
import colors from '../constants/theme';

type CustomTextProps = TextProps & {
  children: ReactNode;
};

export default function CustomText({ children, style, ...props }: CustomTextProps) {
  return (
    <Text style={[styles.default, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: fonts.nunitoRegular,
  },
});
