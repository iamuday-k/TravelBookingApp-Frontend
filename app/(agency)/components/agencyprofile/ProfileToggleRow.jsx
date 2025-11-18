import React from "react";
import { View, Text } from "react-native";

export default function ProfileToggleRow({ label, enabled }) {
  return (
    <View className="flex-row justify-between px-6 py-3 items-center">
      <Text className="text-white font-semibold">{label}</Text>
      <View className="w-12 h-6 rounded-full bg-white/20 items-center justify-center">
        <View
          className={`w-5 h-5 rounded-full ${enabled ? "ml-6" : "ml-1"} bg-white`}
        />
      </View>
    </View>
  );
}
