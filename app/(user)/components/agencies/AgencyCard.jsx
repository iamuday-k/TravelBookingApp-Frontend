// components/agencies/AgencyCard.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TIER_CONFIG } from '../../../../constants/tierConfig';

const AgencyCard = ({ agency, tier, isInWishlist, onToggleWishlist }) => {
  const config = TIER_CONFIG[tier];

  const handlePress = () => {
    console.log('Agency card pressed:', agency.id, agency.name);
    // router.push(`/package/${agency.id}`);
  };

  const handleWishlist = () => {
    onToggleWishlist(agency.id);
  };

  const handleViewPackages = () => {
    console.log('View packages pressed for:', agency.id, agency.name);
    // router.push(`/packages/${agency.id}`);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      className="bg-gray-800 rounded-2xl overflow-hidden mb-4 mx-4"
    >
      <View className="relative">
        <Image
          source={{ uri: agency.image }}
          className="w-full h-52"
          resizeMode="cover"
        />
        
        {config.badge && (
          <View
            className={`absolute top-3 left-3 ${config.badge.bg} px-3 py-1.5 rounded-full`}
          >
            <Text className={`${config.badge.textColor} font-bold text-xs`}>
              {config.badge.text}
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={handleWishlist}
          className="absolute top-3 right-3 bg-white/90 p-2.5 rounded-full"
          activeOpacity={0.7}
        >
          <Feather
            name="heart"
            size={20}
            color="#EF4444"
            fill={isInWishlist ? "#EF4444" : "transparent"}
          />
        </TouchableOpacity>
      </View>

      <View className="p-4">
        <Text className="text-white font-bold text-lg" numberOfLines={1}>
          {agency.name}
        </Text>

        <View className="flex-row items-center mt-1">
          <Feather name="map-pin" size={14} color="#9CA3AF" />
          <Text className="text-gray-400 text-sm ml-1">{agency.location}</Text>
        </View>

        <View className="flex-row items-center justify-between mt-3">
          <View>
            <View className="flex-row items-baseline">
              <Text className="text-white font-bold text-2xl">
                ${agency.price}
              </Text>
              <Text className="text-gray-400 text-sm ml-1">/person</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Feather
                key={star}
                name="star"
                size={16}
                color="#FCD34D"
                fill={star <= Math.floor(agency.rating) ? "#FCD34D" : "transparent"}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity
          onPress={handleViewPackages}
          className={`${config.button.bg} ${config.button.activeOpacity} mt-4 py-3.5 rounded-xl items-center`}
          activeOpacity={0.8}
        >
          <Text className={`${config.button.text} font-bold text-base`}>
            View Packages
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default AgencyCard;