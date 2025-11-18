// components/agencies/LocationFilter.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LOCATIONS, TIER_CONFIG } from '../../../../constants/tierConfig';

const LocationFilter = ({ selectedLocation, onSelectLocation, tier }) => {
  const config = TIER_CONFIG[tier];

  return (
    <View className="px-4 py-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {LOCATIONS.map((location) => {
          const isSelected = selectedLocation === location;
          return (
            <TouchableOpacity
              key={location}
              onPress={() => onSelectLocation(location)}
              className={`mr-3 px-5 py-2.5 rounded-full ${
                isSelected
                  ? config.filterButton.active
                  : config.filterButton.inactive
              }`}
            >
              <Text
                className={`font-semibold ${
                  isSelected
                    ? config.filterButton.active.split(' ')[1]
                    : 'text-gray-300'
                }`}
              >
                {location}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default LocationFilter;