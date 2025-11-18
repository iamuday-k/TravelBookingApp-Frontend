import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const PromotionCard = ({ promotion }) => {
  const handlePress = () => {
    console.log('Promotion pressed:', promotion.id);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      className="w-80 mr-4 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600"
    >
      <Image
        source={{ uri: promotion.image || 'https://via.placeholder.com/300x150' }}
        className="w-full h-40"
        resizeMode="cover"
      />
      <View className="p-4">
        <Text className="text-white font-bold text-xl" numberOfLines={2}>
          {promotion.title || 'Special Offer'}
        </Text>
        <Text className="text-blue-100 text-sm mt-2" numberOfLines={2}>
          {promotion.description || 'Limited time offer'}
        </Text>
        <View className="flex-row items-center justify-between mt-3">
          <Text className="text-yellow-300 font-bold text-lg">
            {promotion.discount || '50% OFF'}
          </Text>
          <Feather name="arrow-right" size={20} color="#FFF" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PromotionSection = ({ promotions }) => {
  if (!promotions || promotions.length === 0) return null;

  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-white font-bold text-lg">WELCOME GIFT</Text>
        <TouchableOpacity className="flex-row items-center">
          <Feather name="chevron-right" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {promotions.map((promotion, index) => (
          <PromotionCard key={promotion.id || index} promotion={promotion} />
        ))}
      </ScrollView>
    </View>
  );
};

export { PromotionCard, PromotionSection };
export default PromotionSection;