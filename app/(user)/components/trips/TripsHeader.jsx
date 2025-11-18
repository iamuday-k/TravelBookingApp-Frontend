import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const TripsHeader = () => (
  <View className="pt-12 pb-6 px-4 bg-gray-900">
    <View className="flex-row items-center justify-between">
        <View></View>
      <Text className="text-white text-2xl font-pbold">My Trips</Text>
      <TouchableOpacity onPress={() => console.log('Add trip pressed')}>
        <Feather name="plus" size={28} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);

export default TripsHeader;