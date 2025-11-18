// components/agency/packages/PackageCard.jsx
import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function PackageCard({ item, onEdit, onDelete, onView }) {
  return (
    <View className="px-4">
      <View className="mb-4 rounded-2xl overflow-hidden border border-gray-700"> 
        <ImageBackground source={{ uri: item.image }} className="w-full h-44" imageStyle={{ borderRadius: 12 }}>
          {/* translucent overlay */}
          <View className="absolute inset-0 bg-black/20 rounded-2xl" />
          {/* status pill */}
          <View className="absolute top-3 left-3">
            <View className={`px-3 py-1 rounded-full border ${item.status === 'active' ? 'border-emerald-300' : 'border-blue-300' } bg-black/25`}>
              <Text className={`font-psemibold ${item.status === 'active' ? 'text-emerald-200' : 'text-blue-200' }`}>{item.status === 'active' ? 'Active' : 'Pending'}</Text>
            </View>
          </View>

          {/* bottom row: title + actions */}
          <View className="absolute left-4 bottom-4 right-4 flex-row items-end justify-between">
            <View style={{ flex: 1 }}>
              <Text className="text-white font-pbold text-xl">{item.name}</Text>
              <Text className="text-white/90 font-psemibold">Starting at ${item.startingPrice.toLocaleString()}</Text>
            </View>

            <View className="flex-row items-center ml-3">
              <TouchableOpacity onPress={() => onDelete?.(item.packageId)} className="w-9 h-9 rounded-full bg-white/90 items-center justify-center mr-2">
                <Feather name="trash-2" size={16} color="#111827" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onEdit?.(item.packageId)} className="w-9 h-9 rounded-full bg-white/90 items-center justify-center mr-2">
                <Feather name="edit-3" size={16} color="#111827" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onView?.(item.packageId)} className="w-9 h-9 rounded-full bg-white/90 items-center justify-center">
                <Feather name="eye" size={16} color="#111827" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}
