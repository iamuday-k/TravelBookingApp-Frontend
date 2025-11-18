import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const PackagesHeader = ({ title = "Elite Escapes", subtitle = "Crafting journeys for the world's elite" }) => {
  console.log('🎨 Rendering PackagesHeader');

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800' }}
      className="w-full"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']}
        className="pt-12 pb-8 px-4"
      >
        {/* Top Bar */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity 
            onPress={() => {
              console.log('⬅️ Back button pressed');
              router.back();
            }}
            className="w-10 h-10 items-center justify-center"
          >
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => console.log('🔍 Search pressed')}
            className="w-10 h-10 items-center justify-center"
          >
            <Feather name="search" size={20} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => console.log('🔗 Share pressed')}
            className="w-10 h-10 items-center justify-center"
          >
            <Feather name="share-2" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View className="items-center mb-6">
          <Text className="text-white text-3xl font-bold mb-2">{title}</Text>
          <Text className="text-gray-300 text-sm">{subtitle}</Text>
        </View>

        {/* Rating Summary */}
        <View className="bg-gray-900/60 rounded-2xl p-4 mx-2">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Text className="text-white text-4xl font-bold mr-3">4.8</Text>
              <View>
                <View className="flex-row mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Feather
                      key={i}
                      name={i < 4 ? "star" : "star"}
                      size={16}
                      color={i < 4 ? "#FCD34D" : "#FCD34D"}
                      fill={i < 4 ? "#FCD34D" : "none"}
                    />
                  ))}
                </View>
                <Text className="text-gray-400 text-xs">120 reviews</Text>
              </View>
            </View>
          </View>

          {/* Rating Bars */}
          <View className="space-y-2">
            {[
              { stars: 5, percentage: 100, color: 'bg-yellow-400' },
              { stars: 4, percentage: 95, color: 'bg-yellow-400' },
              { stars: 3, percentage: 50, color: 'bg-yellow-400' },
              { stars: 2, percentage: 16, color: 'bg-yellow-400' },
              { stars: 1, percentage: 16, color: 'bg-yellow-400' }
            ].map((item, index) => (
              <View key={index} className="flex-row items-center">
                <Text className="text-white text-xs w-2 mr-2">{item.stars}</Text>
                <View className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <View 
                    className={`h-full ${item.color}`} 
                    style={{ width: `${item.percentage}%` }}
                  />
                </View>
                <Text className="text-gray-400 text-xs ml-2 w-8">{item.percentage}%</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default PackagesHeader;