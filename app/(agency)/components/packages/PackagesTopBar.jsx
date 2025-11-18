import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PackagesTopBar() {
  const router = useRouter();
  return (
    <View className="px-4 pt-12 pb-4 bg-gray-900 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Feather name="chevron-left" size={22} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-pblack text-lg">My Packages</Text>
      </View>

      <View className="flex-row items-center">
        {/* Changed: navigate to add package page */}
        <TouchableOpacity onPress={() => router.push("/(agency)/packages/add")} className="mr-4">
          <Feather name="plus-circle" size={22} color="white" />
        </TouchableOpacity>

        <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
          <Text className="text-white font-pbold text-sm">GV</Text>
        </View>
      </View>
    </View>
  );
}
