import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const TestimonialCard = ({ testimonial }) => {
  const handlePress = () => {
    console.log('Testimonial pressed:', testimonial.id);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      className="w-72 mr-4 rounded-2xl p-6 bg-gradient-to-br from-pink-600/20 to-purple-600/20 border border-pink-500/30"
    >
      <View className="flex-row justify-center mb-4">
        <View className="bg-red-600 rounded-full w-16 h-16 items-center justify-center">
          <Feather name="play" size={24} color="#FFF" />
        </View>
      </View>
      
      <Text className="text-white text-center font-semibold text-base" numberOfLines={2}>
        {testimonial.title || 'Customer Review'}
      </Text>
      
      {testimonial.author && (
        <Text className="text-gray-400 text-center text-sm mt-2">
          - {testimonial.author}
        </Text>
      )}
      
      <View className="flex-row justify-center mt-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Feather
            key={star}
            name="star"
            size={14}
            color="#FCD34D"
            fill="#FCD34D"
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const TestimonialSection = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <View className="mt-6 mb-8">
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-white font-bold text-lg">TESTIMONIAL</Text>
        <TouchableOpacity className="flex-row items-center">
          <Feather name="chevron-right" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={testimonial.id || index} testimonial={testimonial} />
        ))}
      </ScrollView>
    </View>
  );
};

export { TestimonialCard, TestimonialSection };
export default TestimonialSection;