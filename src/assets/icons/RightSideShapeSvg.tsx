import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

interface RightSideShapeSvgProps {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

export default function RightSideShapeSvg({
  width = 70,
  height = 70,
  style,
}: RightSideShapeSvgProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      fill="none"
      style={style}
    >
      <G opacity="0.05">
        <Path
          d="M41 41C49.5 32.5 49.5 18.75 41 10.5L10.5 41C18.75 49.5 32.5 49.5 41 41ZM40 17.5C41.5 17.5 42.5 18.5 42.5 20C42.5 21.5 41.5 22.5 40 22.5C38.5 22.5 37.5 21.5 37.5 20C37.5 18.5 38.5 17.5 40 17.5ZM40 27.5C41.5 27.5 42.5 28.5 42.5 30C42.5 31.5 41.5 32.5 40 32.5C38.5 32.5 37.5 31.5 37.5 30C37.5 28.5 38.5 27.5 40 27.5ZM30 27.5C31.5 27.5 32.5 28.5 32.5 30C32.5 31.5 31.5 32.5 30 32.5C28.5 32.5 27.5 31.5 27.5 30C27.5 28.5 28.5 27.5 30 27.5ZM30 37.5C31.5 37.5 32.5 38.5 32.5 40C32.5 41.5 31.5 42.5 30 42.5C28.5 42.5 27.5 41.5 27.5 40C27.5 38.5 28.5 37.5 30 37.5ZM20 42.5C18.5 42.5 17.5 41.5 17.5 40C17.5 38.5 18.5 37.5 20 37.5C21.5 37.5 22.5 38.5 22.5 40C22.5 41.5 21.5 42.5 20 42.5ZM46.5 46.5C35 58 16.5 58 5 46.5L8.5 43C18 52.5 33.25 52.5 42.75 43C52.25 33.5 52.25 18.25 42.75 8.75L46.5 5C57.75 16.5 57.75 35 46.5 46.5Z"
          fill="black"
        />
      </G>
    </Svg>
  );
}
