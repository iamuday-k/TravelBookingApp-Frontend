import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const DestinationCard = ({ destination }) => {
  const handlePress = () => {
    console.log('Destination pressed:', destination.id);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      className="w-48 mr-4 rounded-2xl overflow-hidden bg-gray-800"
    >
      <View className="relative">
        <Image
          source={{ uri: destination.image || 'https://via.placeholder.com/200' }}
          className="w-full h-56"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/30" />
        <View className="absolute bottom-0 left-0 right-0 p-4">
          <Text className="text-white font-bold text-lg text-center" numberOfLines={2}>
            {destination.name || destination.title || 'Destination'}
          </Text>
          {destination.location && (
            <View className="flex-row items-center justify-center mt-1">
              <Feather name="map-pin" size={12} color="#93C5FD" />
              <Text className="text-blue-200 text-xs ml-1">{destination.location}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DestinationSection = ({ title, destinations }) => {
  if (!destinations || destinations.length === 0) return null;

  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-white font-bold text-lg uppercase">{title}</Text>
        <TouchableOpacity className="flex-row items-center">
          <Feather name="chevron-right" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {destinations.map((destination, index) => (
          <DestinationCard key={destination.id || index} destination={destination} />
        ))}
      </ScrollView>
    </View>
  );
};

export { DestinationCard, DestinationSection };
export default DestinationSection;