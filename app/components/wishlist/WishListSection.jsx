// components/wishlist/WishlistSection.jsx
import React from 'react';
import { View } from 'react-native';
import WishlistSectionHeader from './WishListSectionHeader';
import WishlistCard from './WishListCard';

const WishlistSection = ({ section, onCardPress }) => {
  // Don't render if no items
  if (!section?.items || section.items.length === 0) {
    return null;
  }

  return (
    <View className="mb-6">
      <WishlistSectionHeader
        name={section.name}
        color={section.color}
        itemCount={section.items.length}
      />
      
      <View className="flex-row flex-wrap justify-between px-4">
        {section.items.map((item) => (
          <View key={item.itemId} className="w-[48%] mb-4">
            <WishlistCard
              item={item}
              onPress={onCardPress}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default WishlistSection;