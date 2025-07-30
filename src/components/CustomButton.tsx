import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { fonts } from '../assets/fonts/fonts';
import colors from '../constants/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type CustomButtonProps = TouchableOpacityProps & {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function CustomButton({
  title,
  onPress,
  style,
  textStyle,
  ...props
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      {...props}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor:colors.primary,
    paddingVertical: 17,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 5,
    minWidth: 130,
    alignSelf: 'center',
  },
  text: {
    color: colors.background,
    fontSize:wp('4.5%'),
    fontFamily: fonts.nunitoExtraBold,
    textAlign: 'center',
    lineHeight:23,
    top:-3
  },
});
