import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const AvailablePackageCard = ({ package: pkg, onItineraryPress }) => {
  console.log('🎴 Rendering AvailablePackageCard:', pkg.name);

  return (
    <View className="bg-gray-800 rounded-2xl overflow-hidden mb-4">
      {/* Image */}
      <Image
        source={{ uri: pkg.image }}
        className="w-full h-56"
        resizeMode="cover"
      />

      {/* Content */}
      <View className="p-4">
        <Text className="text-white font-bold text-xl mb-1">{pkg.name}</Text>
        <Text className="text-blue-400 text-sm mb-3">{pkg.ratingText}</Text>
        
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-white text-lg">
              <Text className="font-semibold">Starting from </Text>
              <Text className="text-blue-400 font-bold">
                ${pkg.price} / person
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              console.log('📋 Itinerary pressed for:', pkg.id);
              onItineraryPress(pkg.id);
            }}
            className="bg-white rounded-full px-6 py-2.5"
            activeOpacity={0.9}
          >
            <Text className="text-gray-900 font-semibold">Itinerary</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AvailablePackageCard;