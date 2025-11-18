// components/wishlist/WishlistFilter.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { WISHLIST_FILTERS } from '../../../../constants/wishlistConfig';
const WishlistFilter = ({ selectedFilter, onSelectFilter }) => {
  return (
    <View className="px-4 py-4 bg-gray-900">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {WISHLIST_FILTERS.map((filter) => {
          const isSelected = selectedFilter === filter;
          return (
            <TouchableOpacity
              key={filter}
              onPress={() => {
                console.log('Filter selected:', filter);
                onSelectFilter(filter);
              }}
              activeOpacity={0.7}
              className={`mr-3 px-5 py-2.5 rounded-full ${
                isSelected ? 'bg-blue-500' : 'bg-gray-800'
              }`}
            >
              <Text
                className={`font-semibold ${
                  isSelected ? 'text-white' : 'text-gray-300'
                }`}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default WishlistFilter;