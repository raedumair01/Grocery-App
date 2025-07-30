// src/assets/icons/NotificationIcon.tsx
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const NotificationIcon = ({ color = 'white', size = 22 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C10.9 2 10 2.9 10 4V5C6.1 5 3 8.1 3 12V17L1 19V20H23V19L21 17V12C21 8.1 17.9 5 14 5V4C14 2.9 13.1 2 12 2ZM12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z"
      fill={color}
    />
  </Svg>
);

export default NotificationIcon;
