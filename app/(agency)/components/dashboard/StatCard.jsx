import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

/**
 * props:
 *  - title, value, change
 *  - colors: array of gradient colors e.g. ["#ff7b7b","#ffb199"]
 */
export default function StatCard({ title, value, change = 0, colors = ["#06b6d4", "#10b981"] }) {
  const changeText = change >= 0 ? `+${change}%` : `${change}%`;
  const changeColorClass = change >= 0 ? "text-emerald-300" : "text-red-400";

  return (
    // wrapper ensures overflow hidden when rounding gradient children
    <View style={{ flexBasis: "48%" }} className="mb-3">
      <LinearGradient
        colors={colors}
        start={[0, 0]}
        end={[1, 1]}
        // important: apply borderRadius via style so clipping works
        className="mr-4"
        style={{ borderRadius: 16, padding: 16 }}
      >
        <Text className="text-white/90 font-psemibold text-sm">{title}</Text>
        <Text className="text-white font-pblack text-2xl mt-2">{value}</Text>
        <Text className={`${changeColorClass} mt-1 font-psemibold`}>{changeText}</Text>
      </LinearGradient>
    </View>
  );
}
