// GoVyral/app/(auth)/components/FormField.jsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

export default function FormField({
  label,
  value,
  onChangeText,
  placeholder = '',
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
  prefix,
  error,
  rightComponent,
}) {
  return (
    <View className="mb-4 px-4">
      {label ? <Text className="text-white text-sm mb-2">{label}</Text> : null}
      <View className="flex-row items-center">
        {prefix ? <View className="mr-2">{prefix}</View> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.5)"
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          className={`flex-1 bg-white px-4 py-3 rounded-full text-black ${multiline ? 'h-24 rounded-lg' : ''}`}
        />
        {rightComponent ? <View className="ml-3">{rightComponent}</View> : null}
      </View>
      {error ? <Text className="text-red-400 text-xs mt-1">{error}</Text> : null}
    </View>
  );
}
