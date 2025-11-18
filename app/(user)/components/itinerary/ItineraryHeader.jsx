import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const ItineraryHeader = ({ image, rating, totalReviews, ratingBreakdown }) => {
  console.log('🎨 Rendering ItineraryHeader');

  return (
    <ImageBackground
      source={{ uri: image }}
      className="w-full h-64"
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)']}
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

          <TouchableOpacity
            onPress={() => console.log('🔗 Share pressed')}
            className="w-10 h-10 items-center justify-center"
          >
            <Feather name="share-2" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Rating Card */}
        <View className="bg-gray-900/70 rounded-2xl p-4 mt-auto mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <Text className="text-white text-4xl font-bold mr-3">{rating}</Text>
              <View>
                <View className="flex-row mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Feather
                      key={i}
                      name="star"
                      size={14}
                      color="#FCD34D"
                      fill={i < Math.floor(rating) ? "#FCD34D" : "none"}
                    />
                  ))}
                </View>
                <Text className="text-gray-400 text-xs">{totalReviews} reviews</Text>
              </View>
            </View>
          </View>

          {/* Rating Bars */}
          <View className="space-y-1">
            {ratingBreakdown.map((item, index) => (
              <View key={index} className="flex-row items-center">
                <Text className="text-white text-xs w-2 mr-2">{item.stars}</Text>
                <View className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-yellow-400"
                    style={{ width: `${item.percentage}%` }}
                  />
                </View>
                <Text className="text-gray-400 text-xs ml-2 w-10">{item.percentage}%</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default ItineraryHeader;