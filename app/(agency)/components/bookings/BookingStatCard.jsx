import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BookingStatCard = ({ icon, count, label, bgColor, iconColor }) => {
  return (
    <View className="bg-[#1A1B23] rounded-2xl p-4 flex-1 mx-1">
      <View className={`w-12 h-12 ${bgColor} rounded-full items-center justify-center mb-3`}>
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>
      <Text className="text-white text-3xl font-bold mb-1">{count}</Text>
      <Text className="text-gray-400 text-sm">{label}</Text>
    </View>
  );
};

export default BookingStatCard;