import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function AgencyProfileCard({ profile, onEditPress }) {
  return (
    <View className="px-6 pt-6 pb-4">
      <View className="flex-row items-center">
        <Image
          source={{ uri: profile?.profilePicture }}
          className="w-20 h-20 rounded-full mr-4"
          style={{ resizeMode: "cover" }}
        />
        <View className="flex-1">
          <Text className="text-white text-xl font-bold">{profile?.name}</Text>
          <Text className="text-white/80 mt-1">{profile?.email}</Text>
          <Text className="text-white/60 mt-1">{profile?.phone}</Text>
          <Text className="text-white/60 mt-1">{profile?.address}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onEditPress}
        className="mt-4 bg-blue-500 px-4 py-2 rounded-full w-40 items-center justify-center self-start"
      >
        <Text className="text-white font-semibold">Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
