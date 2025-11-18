import React from "react";
import { View, Text } from "react-native";

export default function ProfileSettingsRow({ label, value }) {
  return (
    <View className="flex-row justify-between px-6 py-3 items-center">
      <Text className="text-white font-semibold">{label}</Text>
      <Text className="text-white/80">{value}</Text>
    </View>
  );
}
