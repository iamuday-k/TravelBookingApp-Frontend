// components/agency/packages/FormField.jsx
import React from "react";
import { View, Text, TextInput } from "react-native";

export default function FormField({
  title, value, onChangeText, placeholder, otherStyles = "", multiline = false, keyboardType = "default"
}) {
  return (
    <View className={`w-full ${otherStyles}`}>
      {title ? <Text className="text-white font-psemibold mb-2">{title}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        className="border border-gray-700 rounded-xl px-4 py-3 text-white"
        multiline={multiline}
        keyboardType={keyboardType}
      />
    </View>
  );
}
