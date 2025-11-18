import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const PackageDetailsHeader = ({ image, title, subtitle, tagline }) => {
  console.log('🎨 Rendering PackageDetailsHeader');

  return (
    <ImageBackground
      source={{ uri: image }}
      className="w-full h-72"
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
        className="flex-1"
      >
        {/* Top Navigation */}
        <View className="flex-row items-center justify-between pt-12 px-4">
          <TouchableOpacity
            onPress={() => {
              console.log('⬅️ Back to packages');
              router.back();
            }}
            className="w-10 h-10 items-center justify-center"
          >
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log('🔗 Share package')}
            className="w-10 h-10 items-center justify-center"
          >
            <Feather name="share-2" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View className="flex-1 justify-end pb-8 px-6">
          <Text className="text-yellow-400 text-xs font-semibold tracking-widest mb-2">
            {subtitle || "LUXURY RESORT"}
          </Text>
          <Text className="text-white text-5xl font-bold mb-1">{title}</Text>
          <Text className="text-white text-sm tracking-widest">
            {tagline || "BAREFOOT BLISS"}
          </Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default PackageDetailsHeader;