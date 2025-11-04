import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const ProfileHeader = () => (
  <View className="pt-12 pb-6 px-4 bg-gray-900">
    <View className="flex-row items-center justify-between">
      <TouchableOpacity onPress={() => {
        console.log('Back button pressed');
        router.back();
      }}>
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <Text className="text-white text-2xl font-bold">Profile & Settings</Text>
      <View style={{ width: 24 }} />
    </View>
  </View>
);

export default ProfileHeader;