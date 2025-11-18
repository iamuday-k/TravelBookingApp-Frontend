// components/agency/packages/FilterChips.jsx
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const Chip = ({ title, active, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.85}
    className={`px-4 py-2 rounded-full mr-3 ${active ? "bg-transparent border-2 border-primary" : "bg-transparent border border-gray-700"}`}>
    <Text className={`font-psemibold ${active ? "text-white" : "text-gray-200"}`}>{title}</Text>
  </TouchableOpacity>
);

export default function FilterChips({ status, onChange }) {
  return (
    <View className="px-4 pt-3 pb-4 flex-row">
      <Chip title="Sort By" active={false} onPress={() => onChange({ sort: "recent" })} />
      <Chip title="Active" active={status === "active"} onPress={() => onChange({ status: "active" })} />
      <Chip title="Pending" active={status === "pending"} onPress={() => onChange({ status: "pending" })} />
    </View>
  );
}
