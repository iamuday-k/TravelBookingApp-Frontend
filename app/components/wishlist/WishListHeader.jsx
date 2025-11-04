// components/wishlist/WishlistHeader.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const WishlistHeader = ({ title = "My Wishlist" }) => {
  const handleBack = () => {
    console.log('Back button pressed');
    router.back();
  };

  return (
    <View className="pt-12 pb-6 px-4 ">
      <View className="flex-row items-end justify-between">
        <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        
        <Text className="text-white text-2xl font-bold">{title}</Text>
      </View>
    </View>
  );
};

export default WishlistHeader;