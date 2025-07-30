// src/assets/icons/SearchIcon.js
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SearchIcon = ({ size = 18, color = '#2F2E41' }) => (
  <Svg width={size} height={size + 1} viewBox="0 0 18 19" fill="none">
    <Path
      d="M9 17.28C13.4183 17.28 17 13.7105 17 9.30741C17 4.90428 13.4183 1.33484 9 1.33484C4.58172 1.33484 1 4.90428 1 9.30741C1 13.7105 4.58172 17.28 9 17.28Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SearchIcon;
