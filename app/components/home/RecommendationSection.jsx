import  { useRef, useState } from 'react';
import { View, Text,  Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = 175;
const CARD_MARGIN = 8;
const SPACER = (screenWidth - CARD_WIDTH) / 2 - CARD_MARGIN;
const router = useRouter();

const RecommendedCard = ({ trip, index, scrollX, isScrolling }) => {
  const inputRange = [
    (index - 1) * CARD_WIDTH,
    index * CARD_WIDTH,
    (index + 1) * CARD_WIDTH,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.9, 1.1, 0.9],
    extrapolate: 'clamp',
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.6, 1, 0.6],
    extrapolate: 'clamp',
  });

  const shadowOpacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 0.3, 0],
    extrapolate: 'clamp',
  });

  const handlePress = () => {
    console.log('Trip pressed:', trip.id);
    router.push('/packages');

  };

  const handleWishlist = () => {
    console.log('Wishlist pressed:', trip.id);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      style={{
        width: CARD_WIDTH,
        marginHorizontal: CARD_MARGIN,
        // Add padding to prevent clipping of scaled content and shado
        paddingVertical: 20, // This gives space for scaling and shadow
        
      }}
    >
      <Animated.View
        style={{
          transform: [{ scale }],
          opacity,
          shadowColor: 'white',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.9,
          shadowRadius: 0, // Increased shadow radius
          elevation: 8, // Increased elevation for Android
        }}
        className="relative rounded-2xl overflow-hidden bg-gray-800"
      >
        <Image
          source={{ uri: trip.image || 'https://via.placeholder.com/150' }}
          className="w-full h-52"
          resizeMode="cover"
        />
        <TouchableOpacity
            onPress={handleWishlist}
            className="absolute top-3 right-3 bg-white/90 p-2 rounded-full"
          >
            <Feather name="heart" size={18} color="#EF4444" />
        </TouchableOpacity>
        
        <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <Text className="text-white font-bold text-sm" numberOfLines={2}>
            {trip.title || trip.name || 'Destination'}
          </Text>
          {trip.rating && (
            <View className="flex-row items-center mt-1">
              <Feather name="star" size={12} color="#FCD34D" fill="#FCD34D" />
              <Text className="text-white text-xs ml-1">{trip.rating}</Text>
            </View>
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const RecommendedSection = ({ trips }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollViewRef = useRef(null);

  if (!trips || trips.length === 0) return null;

  // Add spacer items for better scrolling experience
  const spacerItem = { id: 'spacer-left' };
  const spacerItemRight = { id: 'spacer-right' };
  const itemsWithSpacers = [spacerItem, ...trips, spacerItemRight];

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
    }
  );

  const handleScrollBegin = () => {
    setIsScrolling(true);
  };

  const handleScrollEnd = () => {
    setIsScrolling(false);
  };

  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-white font-pbold text-lg">RECOMMENDED</Text>
        <TouchableOpacity className="flex-row items-center">
          <Feather name="chevron-right" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      
      {/* Add extra vertical space to prevent clipping */}
      <View style={{ height: 240 }}> {/* Increased container height */}
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 0,
            alignItems: 'center', // This helps with vertical alignment
          }}
          snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
          decelerationRate="fast"
          onScroll={handleScroll}
          onScrollBeginDrag={handleScrollBegin}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
        >
          {itemsWithSpacers.map((item, index) => {
            if (item.id === 'spacer-left' || item.id === 'spacer-right') {
              return (
                <View
                  key={item.id}
                  style={{ width: SPACER }}
                />
              );
            }

            const tripIndex = index - 1; // Adjust for spacer
            return (
              <RecommendedCard
                key={item.id || tripIndex}
                trip={item}
                index={tripIndex}
                scrollX={scrollX}
                isScrolling={isScrolling}
              />
            );
          })}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

export default RecommendedSection;