import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const BookingHeader = ({ image, step, totalSteps = 4 }) => {
  console.log('🎨 Rendering BookingHeader - Step', step);

  const progress = (step / totalSteps) * 100;

  return (
    <ImageBackground
      source={{ uri: image }}
      className="w-full h-40"
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)']}
        className="flex-1 pt-12 px-4"
      >
        {/* Top Navigation */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity
            onPress={() => {
              console.log('⬅️ Back pressed');
              router.back();
            }}
            className="w-10 h-10 items-center justify-center"
          >
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>

          <Text className="text-white font-semibold text-lg">Booking</Text>

          <TouchableOpacity
            onPress={() => console.log('ℹ️ Info pressed')}
            className="w-10 h-10 items-center justify-center"
          >
            <Feather name="info" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View className="absolute bottom-6 left-4 right-4">
          <Text className="text-white text-sm mb-2">Step {step} of {totalSteps}</Text>
          <View className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <View
              className="h-full bg-yellow-400 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default BookingHeader;