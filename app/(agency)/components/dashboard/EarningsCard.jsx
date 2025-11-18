// components/agency/EarningsCard.jsx
import { View, Text, Image } from "react-native";

export default function EarningsCard({ amount }) {
  return (
    <View className="flex-row items-center justify-between bg-gray-800 rounded-2xl p-4 mx-4 mt-4">
      <View>
        <Text className="text-primary font-psemibold">Earnings</Text>
        <Text className="text-white font-pbold text-xl">${amount.toLocaleString()}</Text>
        <Text className="text-gray-400">Total Earnings</Text>
      </View>
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1567427013953-22d25f35b4f0?q=80&w=780&auto=format" }}
        className="w-24 h-20 rounded-xl"
      />
    </View>
  );
}
