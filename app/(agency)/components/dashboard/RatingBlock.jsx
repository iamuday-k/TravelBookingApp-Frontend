// components/agency/RatingBlock.jsx
import React from "react";
import { View, Text } from "react-native";

const Bar = ({ label, pct }) => (
  <View className="flex-row items-center mb-2">
    <Text className="text-white w-5">{label}</Text>
    <View className="flex-1 h-2 bg-gray-700 rounded-full mx-3 overflow-hidden">
      <View style={{ width: `${Math.min(pct,100)}%` }} className="h-2 bg-primary" />
    </View>
    <Text className="text-white w-12 text-right">{pct}%</Text>
  </View>
);

export default function RatingBlock({ rating, reviewsCount, dist }) {
  return (
    <View className="rounded-2xl mx-4 mt-6 p-4 bg-gray-800">
      <Text className="text-white font-pblack text-3xl">{rating}</Text>
      <View className="flex-row items-center mt-1">
        <Text className="text-yellow-400 mr-2">★★★★★</Text>
        <Text className="text-gray-400">{reviewsCount} reviews</Text>
      </View>
      <View className="mt-3">
        {[5,4,3,2,1].map(s => <Bar key={s} label={s} pct={dist[s] || 0} />)}
      </View>
    </View>
  );
}
