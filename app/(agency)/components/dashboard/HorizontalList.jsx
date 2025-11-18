// components/agency/HorizontalList.jsx
import { FlatList, View, Text } from "react-native";

export default function HorizontalList({ title, data, renderItem, rightAction }) {
  return (
    <View className="mt-6">
      <View className="px-4 flex-row items-center justify-between">
        <Text className="text-white font-pblack text-xl">{title}</Text>
        {rightAction}
      </View>
      <FlatList
        className="mt-3 pl-4"
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
