// components/wishlist/WishlistList.jsx
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import WishlistSection from './WishListSection';
import Loader from '../common/Loader';

const WishlistList = ({ sections, loading, onCardPress }) => {
  // Show loader only on initial load
  if (loading && (!sections || sections.length === 0)) {
    return (
      <View className="flex-1 items-center justify-center">
        <Loader />
      </View>
    );
  }

  // Show empty state only when not loading and no sections
  if (!loading && (!sections || sections.length === 0)) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <Feather name="heart" size={64} color="#4B5563" />
        <Text className="text-gray-400 text-lg mt-4 text-center">
          Your wishlist is empty
        </Text>
        <Text className="text-gray-500 text-sm mt-2 text-center">
          Start adding your favorite trips to save them here
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-900"
      showsVerticalScrollIndicator={false}
    >
      <View className="py-4">
        {sections.map((section) => (
          <WishlistSection
            key={section.wishlistId}
            section={section}
            onCardPress={onCardPress}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default WishlistList;