// components/agency/Interactions.jsx
import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const Row = ({ icon, color, title, subtitle }) => (
  <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-700">
    <View className="flex-row items-center">
      <View className="w-10 h-10 rounded-2xl items-center justify-center mr-3" style={{ backgroundColor: color }}>
        <Feather name={icon} size={18} color="#fff" />
      </View>
      <View>
        <Text className="text-white font-psemibold">{title}</Text>
        <Text className="text-emerald-300 text-sm">{subtitle}</Text>
      </View>
    </View>
    <Feather name="chevron-right" size={20} color="white" />
  </View>
);

export default function Interactions({ queries, replies }) {
  return (
    <View className="rounded-2xl mx-4 mt-6 bg-gray-800 overflow-hidden">
      <View className="px-4 py-3"><Text className="text-white font-pblack text-lg">Customer Interactions</Text></View>
      <Row icon="help-circle" color="#ef4444" title="Queries" subtitle={`${queries} new queries`} />
      <Row icon="message-circle" color="#8b5cf6" title="Replies" subtitle={`${replies} new replies`} />
    </View>
  );
}
