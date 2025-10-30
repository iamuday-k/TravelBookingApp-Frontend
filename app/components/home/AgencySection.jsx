import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AgencyCard from './AgencyCard';

const AgencySection = ({ title, agencies, type }) => {
  if (!agencies || agencies.length === 0) return null;

  const getTitleColor = () => {
    switch (type) {
      case 'elite':
        return 'text-yellow-400';
      case 'premium':
        return 'text-blue-400';
      case 'verified':
        return 'text-green-400';
      default:
        return 'text-white';
    }
  };

  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className={`${getTitleColor()} font-bold text-lg uppercase tracking-wider`}>
          {title}
        </Text>
        <TouchableOpacity className="flex-row items-center">
          <Feather name="chevron-right" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {agencies.map((agency, index) => (
          <AgencyCard
            key={agency.id || index}
            agency={agency}
            type={type}
            image={agency.image}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AgencySection;