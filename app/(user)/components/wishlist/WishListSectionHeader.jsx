// components/wishlist/WishlistSectionHeader.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { SECTION_COLORS } from '../../../../constants/wishlistConfig';

const WishlistSectionHeader = ({ name, color, itemCount }) => {
  const colorConfig = SECTION_COLORS[color] || SECTION_COLORS.yellow;

  return (
    <View className={`${colorConfig.bg} px-4 py-3 mx-4 mb-4 rounded-xl flex-row items-center justify-between`}>
      <View className="flex-row items-center">
        <Feather name="briefcase" size={20} color={colorConfig.text.includes('white') ? 'white' : '#1F2937'} />
        <Text className={`${colorConfig.text} font-bold text-lg ml-2`}>
          {name}
        </Text>
      </View>
      <Text className={`${colorConfig.text} font-semibold`}>
        {itemCount} {itemCount === 1 ? 'item' : 'items'}
      </Text>
    </View>
  );
};

export default WishlistSectionHeader;