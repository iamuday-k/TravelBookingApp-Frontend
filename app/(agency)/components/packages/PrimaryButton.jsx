// components/agency/packages/PrimaryButton.jsx
import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function PrimaryButton({ title, onPress, loading }) {
  return (
    <TouchableOpacity disabled={loading} onPress={onPress} activeOpacity={0.9}
      className="mx-6 mb-8 mt-6 bg-primary rounded-2xl py-3 items-center">
      <Text className="text-white font-psemibold text-lg">{loading ? "Publishing..." : title}</Text>
    </TouchableOpacity>
  );
}
