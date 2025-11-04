// components/wishlist/WishlistCard.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TIER_CONFIG } from '../../../constants/tierConfig';

const WishlistCard = ({ item, onPress }) => {
  const details = item.details;
  
  // Safe fallback for tier
  const tier = details.tier && TIER_CONFIG[details.tier] ? details.tier : 'elite';
  const config = TIER_CONFIG[tier];

  const handlePress = () => {
    console.log('Wishlist card pressed:', details.id, details.name);
    onPress?.(details.id);
  };

  // Don't render if essential data is missing
  if (!details || !details.image || !details.name) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      className="bg-gray-800 rounded-2xl overflow-hidden"
    >
      <View className="relative">
        <Image
          source={{ uri: details.image }}
          className="w-full h-40"
          resizeMode="cover"
        />
        
        {config?.badge && (
          <View
            className={`absolute top-2 left-2 ${config.badge.bg} px-2 py-1 rounded-full`}
          >
            <Text className={`${config.badge.textColor} font-bold text-xs`}>
              {config.badge.text}
            </Text>
          </View>
        )}
      </View>

      <View className="p-3">
        <Text className="text-white font-bold text-base" numberOfLines={1}>
          {details.name}
        </Text>

        <View className="flex-row items-center mt-1">
          <Feather name="map-pin" size={12} color="#9CA3AF" />
          <Text className="text-gray-400 text-xs ml-1" numberOfLines={1}>
            {details.location}
          </Text>
        </View>

        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-baseline">
            <Text className="text-white font-bold text-lg">
              ${details.price}
            </Text>
          </View>

          <View className="flex-row items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Feather
                key={star}
                name="star"
                size={12}
                color="#FCD34D"
                fill={star <= Math.floor(details.rating) ? "#FCD34D" : "transparent"}
              />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WishlistCard;