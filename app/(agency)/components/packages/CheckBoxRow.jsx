// components/agency/packages/CheckboxRow.jsx
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function CheckboxRow({ label, checked, onToggle }) {
  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.85} className="flex-row items-center mr-4 mb-2">
      <View className={`w-5 h-5 mr-3 rounded-sm items-center justify-center ${checked ? 'bg-primary' : 'border border-gray-600'}`}>
        {checked ? <Feather name="check" size={12} color="#fff" /> : null}
      </View>
      <Text className="text-white">{label}</Text>
    </TouchableOpacity>
  );
}
