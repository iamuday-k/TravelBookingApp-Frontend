// components/agency/packages/DayItem.jsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function DayItem({ dayLabel, value, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} className="border border-gray-700 rounded-xl p-3 mb-3 w-full">
      <Text className="text-white font-psemibold">{dayLabel}</Text>
      <Text className="text-gray-400 mt-2">{value || "Write"}</Text>
    </TouchableOpacity>
  );
}
