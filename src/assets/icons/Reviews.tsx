import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const ReviewsIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <G clipPath="url(#clip0)">
      <Path
        d="M16.2 0H1.8C0.81 0 0 0.81 0 1.8V18L3.6 14.4H16.2C17.19 14.4 18 13.59 18 12.6V1.8C18 0.81 17.19 0 16.2 0ZM16.2 12.6H2.853L1.8 13.653V1.8H16.2V12.6Z"
        fill="#2F2E41"
      />
      <Path
        d="M9 11.25L10.1775 8.6775L12.75 7.5L10.1775 6.3225L9 3.75L7.8225 6.3225L5.25 7.5L7.8225 8.6775L9 11.25Z"
        fill="#2F2E41"
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect width="18" height="18" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ReviewsIcon;
