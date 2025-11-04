import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ReviewLinks = () => {
  return (
    <View className="px-4 py-6">
      {/* Review */}
      <TouchableOpacity
        className="flex-row items-center justify-between bg-gray-800 px-4 py-4 rounded-xl mb-4"
        activeOpacity={0.9}
        onPress={() => console.log('Review pressed')}
      >
        <Text className="text-white text-xl font-bold">Review</Text>
        <Feather name="chevron-right" size={20} color="white" />
      </TouchableOpacity>

      {/* Terms and Conditions */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => console.log('Terms and Conditions pressed')}
      >
        <Text className="text-blue-500 text-base mb-2">Terms and Conditions</Text>
      </TouchableOpacity>

      {/* Privacy Policy */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => console.log('Privacy Policy pressed')}
      >
        <Text className="text-blue-500 text-base">Privacy Policy</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewLinks;