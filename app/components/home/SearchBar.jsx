import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const SearchBar = () => {
  const handleSearchPress = () => {
    router.push('/search');
  };

  return (
    <TouchableOpacity 
      onPress={handleSearchPress}
      activeOpacity={0.7}
      className="mx-4 mt-4"
    >
      <View className="flex-row items-center bg-white rounded-full px-4 py-3 shadow-sm">
        <Feather name="search" size={20} color="#9CA3AF" />
        <TextInput
          placeholder="Where to go"
          placeholderTextColor="#9CA3AF"
          className="flex-1 ml-2 text-gray-800"
          editable={false}
          pointerEvents="none"
        />
      </View>
    </TouchableOpacity>
  );
};

export default SearchBar;