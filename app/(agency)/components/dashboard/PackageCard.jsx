// components/agency/PackageCard.jsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function PackageCard({ item, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => onPress?.(item.id)} className="mr-4">
      <View className="w-56 rounded-2xl overflow-hidden bg-gray-800">
        <Image source={{ uri: item.image }} className="w-full h-36" resizeMode="cover" />
        <View className="p-3">
          <Text className="text-white font-pbold text-base">{item.title}</Text>
          <Text className="text-gray-400 text-sm mt-1">{item.days} days, {item.nights} nights</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
