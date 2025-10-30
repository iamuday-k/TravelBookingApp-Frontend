import { View } from "react-native";
import React from "react";

const FloatingBox = ({
  children,style,
  color = "white",
  borderColor = "white",
  height = 250,
  width = 250,
  shadowColor = "rgba(0,0,0,0.6)",
  offset = { width: 1, height: 3 },
  radius = 25,         // default round edges
  elevation = 6,      // default Android shadow
  ...props
}) => {
  return (
    <View
      style={[
        {
          height,
          width,
          backgroundColor: color,
          borderColor,
          borderWidth: 1,
          borderRadius: radius,

          // iOS shadow
          shadowColor,
          shadowOffset: offset,
          shadowOpacity: 0.4,
          shadowRadius: radius,

          // Android shadow
          elevation,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export default FloatingBox;
