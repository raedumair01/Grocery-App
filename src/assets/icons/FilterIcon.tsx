// src/assets/icons/FilterIcon.js
import React from 'react';
import Svg, { Line, Circle } from 'react-native-svg';

const FilterIcon = ({ size = 18, color = '#2F2E41' }) => (
  <Svg width={size} height={size + 1} viewBox="0 0 24 24" fill="none">
    <Line x1="4" y1="6" x2="20" y2="6" stroke={color} strokeWidth="2" />
    <Line x1="4" y1="12" x2="20" y2="12" stroke={color} strokeWidth="2" />
    <Line x1="4" y1="18" x2="20" y2="18" stroke={color} strokeWidth="2" />

    <Circle cx="10" cy="6" r="2" fill={color} />
    <Circle cx="14" cy="12" r="2" fill={color} />
    <Circle cx="8" cy="18" r="2" fill={color} />
  </Svg>
);

export default FilterIcon;
