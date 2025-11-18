// components/agency/AgencyHeader.jsx
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import SidebarMenu from "./SidebarMenu";

export default function AgencyHeader() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <>
      <View className="px-4 pt-12 pb-4 bg-gray-900 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => setSidebarVisible(true)}>
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-pblack text-2xl">Dashboard</Text>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity>
            <Feather name="search" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="bell" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <SidebarMenu 
        visible={sidebarVisible} 
        onClose={() => setSidebarVisible(false)} 
      />
    </>
  );
}