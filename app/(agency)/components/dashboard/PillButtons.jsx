// components/agency/PillButtons.jsx
import { View, Text, TouchableOpacity } from "react-native";

export const PrimaryPill = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.9}
    className="bg-primary px-4 py-3 rounded-xl">
    <Text className="text-white font-psemibold">{title}</Text>
  </TouchableOpacity>
);

export const OutlinePill = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.9}
    className="bg-[#1a2332] px-4 py-3 rounded-xl">
    <Text className="text-white font-psemibold">{title}</Text>
  </TouchableOpacity>
);
