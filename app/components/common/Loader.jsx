import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loader = ({ size = 'large', color = '#4A90E2' }) => {
  return (
    <View className="flex-1 justify-center items-center bg-[#0A1828]">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loader;