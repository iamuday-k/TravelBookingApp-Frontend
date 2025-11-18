// components/TextShadow.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextShadow = ({ children, style, shadowColor = 'rgba(0,0,0,0.6)', offset = { width: 1, height: 3 }, radius = 6, ...props }) => {
  return (
    <Text
      style={[
        {
          textShadowColor: shadowColor,
          textShadowOffset: offset,
          textShadowRadius: radius,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default TextShadow;
