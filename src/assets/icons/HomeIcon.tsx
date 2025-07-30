// src/assets/icons/HomeIcon.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HomeIcon = ({ color = 'white', size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
      fill={color}
    />
  </Svg>
);

export default HomeIcon;
