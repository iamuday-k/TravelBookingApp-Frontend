import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const Search = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#0A1828]">
      <StatusBar style="light" />
      <View className="flex-1 justify-center items-center px-6">
        <Feather name="search" size={64} color="#4A90E2" />
        <Text className="text-white text-2xl font-bold mt-4">Search Page</Text>
        <Text className="text-gray-400 text-center mt-2">
          Search functionality will be implemented here
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-6 bg-blue-500 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Search;