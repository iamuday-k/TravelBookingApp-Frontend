import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const AgencyCard = ({ agency, type, image }) => {
  // Map type directly to tier (only for elite, premium, verified)
  const getTierFromType = (type) => {
    if (type === 'elite') return 'elite';
    if (type === 'premium') return 'premium';
    if (type === 'verified') return 'verified';
    return null; // Don't navigate for other types like welcomeGift
  };

  const handlePress = () => {
    const tier = getTierFromType(type);
    
    if (tier) {
      console.log('Agency pressed:', agency.id, '-> Navigating to tier:', tier);
      router.push({
        pathname: '/agencies',
        params: { tier }
      });
    } else {
      console.log('Agency pressed:', agency.id, '-> No navigation (type:', type, ')');
    }
  };

  const handleViewPackages = () => {
    const tier = getTierFromType(type);
    
    if (tier) {
      console.log('View Packages pressed:', agency.id, '-> Navigating to tier:', tier);
      router.push({
        pathname: '/agencies',
        params: { tier }
      });
    } else {
      console.log('View Packages pressed:', agency.id, '-> No navigation (type:', type, ')');
    }
  };

  const getBadgeConfig = () => {
    switch (type) {
      case 'elite':
        return { text: 'Top Pick', bg: 'bg-yellow-400', textColor: 'text-gray-900' };
      case 'premium':
        return { text: 'New', bg: 'bg-green-500', textColor: 'text-white' };
      default:
        return null;
    }
  };

  const getButtonConfig = () => {
    switch (type) {
      case 'elite':
        return { bg: 'bg-yellow-400', text: 'text-gray-900' };
      case 'premium':
        return { bg: 'bg-blue-500', text: 'text-white' };
      case 'verified':
        return { bg: 'bg-green-500', text: 'text-white' };
      default:
        return { bg: 'bg-blue-500', text: 'text-white' };
    }
  };

  const badge = getBadgeConfig();
  const button = getButtonConfig();

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      className="w-64 mr-4 rounded-2xl overflow-hidden bg-gray-800"
    >
      <View className="relative">
        <Image
          source={{ uri: image }}
          className="w-full h-48"
          resizeMode="cover"
        />
        {badge && (
          <View className={`absolute top-3 left-3 ${badge.bg} px-3 py-1 rounded-full`}>
            <Text className={`${badge.textColor} font-semibold text-xs`}>{badge.text}</Text>
          </View>
        )}
      </View>
      
      <View className="p-4">
        <Text className="text-white font-semibold text-base" numberOfLines={1}>
          {agency.name || 'Agency Name'}
        </Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-yellow-400 font-bold text-lg">
            ₹{agency.price || '1,49,999'}
          </Text>
          <Text className="text-gray-400 text-sm">/person</Text>
        </View>
        
        <View className="flex-row items-center mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Feather
              key={star}
              name="star"
              size={14}
              color="#FCD34D"
              fill={star <= (agency.rating || 5) ? "#FCD34D" : "transparent"}
            />
          ))}
        </View>

        <TouchableOpacity 
          onPress={handleViewPackages}
          className={`${button.bg} mt-3 py-3 rounded-lg items-center`}
        >
          <Text className={`${button.text} font-semibold`}>View Packages</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default AgencyCard;