import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const PackageCard = ({ item, onPress }) => {
  console.log('🎴 Rendering PackageCard:', item.name);

  return (
    <TouchableOpacity
      onPress={() => {
        console.log('📦 Package card pressed:', item.packageId, item.name);
        onPress(item.packageId);
      }}
      className="bg-gray-800 rounded-2xl mb-4 overflow-hidden"
      activeOpacity={0.9}
    >
      {/* Image with Overlay Icons */}
      <View className="relative">
        <Image 
          source={{ uri: item.image }} 
          className="w-full h-52"
          resizeMode="cover"
        />
        
        {/* Top Right Icons */}
        <View className="absolute top-3 right-3 flex-row space-x-2">
          <TouchableOpacity 
            className="bg-gray-900/70 rounded-full p-2"
            onPress={() => console.log('📤 Share package:', item.packageId)}
          >
            <Feather name="share-2" size={16} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-gray-900/70 rounded-full p-2"
            onPress={() => console.log('❤️ Wishlist package:', item.packageId)}
          >
            <Feather name="heart" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View className="p-4">
        <Text className="text-white font-bold text-lg mb-1">{item.name}</Text>
        <Text className="text-gray-400 text-sm mb-3">{item.description}</Text>
        
        <View className="flex-row items-center justify-between">
          <Text className="text-blue-400 font-semibold text-base">
            Starting at ₹{item.price.toLocaleString('en-IN')}
          </Text>
          
          {item.duration && (
            <View className="flex-row items-center">
              <Feather name="clock" size={14} color="#9CA3AF" />
              <Text className="text-gray-400 text-xs ml-1">{item.duration}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PackageCard;