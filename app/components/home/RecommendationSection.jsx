import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const RecommendedCard = ({ trip }) => {
  const handlePress = () => {
    console.log('Trip pressed:', trip.id);
  };

  const handleBookmark = () => {
    console.log('Bookmark pressed:', trip.id);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      className="w-40 mr-4"
    >
      <View className="relative rounded-2xl overflow-hidden">
        <Image
          source={{ uri: trip.image || 'https://via.placeholder.com/150' }}
          className="w-full h-52"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={handleBookmark}
          className="absolute top-2 right-2 bg-white/90 p-2 rounded-full"
        >
          <Feather name="bookmark" size={16} color="#3B82F6" />
        </TouchableOpacity>
        
        <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <Text className="text-white font-bold text-sm" numberOfLines={2}>
            {trip.title || trip.name || 'Destination'}
          </Text>
          {trip.rating && (
            <View className="flex-row items-center mt-1">
              <Feather name="star" size={12} color="#FCD34D" fill="#FCD34D" />
              <Text className="text-white text-xs ml-1">{trip.rating}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RecommendedSection = ({ trips }) => {
  if (!trips || trips.length === 0) return null;

  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-white font-bold text-lg">RECOMMENDED</Text>
        <TouchableOpacity className="flex-row items-center">
          <Feather name="chevron-right" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {trips.map((trip, index) => (
          <RecommendedCard key={trip.id || index} trip={trip} />
        ))}
      </ScrollView>
    </View>
  );
};

export default RecommendedSection;