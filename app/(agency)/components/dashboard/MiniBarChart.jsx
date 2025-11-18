// components/agency/MiniBarChart.jsx
import React from "react";
import { View, Text } from "react-native";

export default function MiniBarChart({ total, data }) {
  const maxVal = Math.max(...data.map(d => d.value), 1);
  return (
    <View className="rounded-2xl mx-4 mt-6 p-4 bg-gray-800">
      <Text className="text-white font-psemibold text-xl">Monthly Bookings</Text>
      <Text className="text-white font-pblack text-3xl mt-2">{total}</Text>
      <Text className="text-gray-400">Last 6 Months</Text>
      <View className="flex-row items-end justify-between mt-4 px-2">
        {data.map(d => (
          <View key={d.label} className="items-center" style={{ width: 36 }}>
            <View className="w-6 bg-teal-300 rounded-md" style={{ height: Math.max(8, (d.value / maxVal) * 120) }} />
            <Text className="text-gray-400 text-xs mt-2">{d.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
