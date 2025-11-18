// components/agency/BookingItem.jsx
import React from "react";
import { View, Text, Image } from "react-native";

export default function BookingItem({ item }) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-transparent">
      <View className="flex-row items-center">
        <Image source={{ uri: item.image }} className="w-12 h-12 rounded-xl mr-3" resizeMode="cover" />
        <View>
          <Text className="text-white font-psemibold">{item.title}</Text>
          <Text className="text-primary text-sm">Booking ID: {item.bookingId}</Text>
        </View>
      </View>
      <Text className="text-white font-psemibold">${item.price.toLocaleString()}</Text>
    </View>
  );
}
