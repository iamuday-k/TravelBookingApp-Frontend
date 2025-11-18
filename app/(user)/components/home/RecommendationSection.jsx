import { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = 175;
const CARD_MARGIN = 8;
const SPACER = (screenWidth - CARD_WIDTH) / 2 - CARD_MARGIN;

const RecommendedCard = ({ trip, index, scrollX }) => {
  const router = useRouter();

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

  const handlePress = () => {
    router.push({ pathname: '/packageDetails', params: { id: trip.id } });
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
        paddingVertical: 20,
      }}
    >
      <Animated.View
        style={{
          transform: [{ scale }],
          opacity,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 6,
          elevation: 6,
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: '#1f2937', // fallback background color
        }}
      >
        <Image
          source={{ uri: trip.image || 'https://via.placeholder.com/150' }}
          style={{ width: '100%', height: 208 }} // height matches your old h-52 roughly
          resizeMode="cover"
        />

        {/* Wishlist icon */}
        <TouchableOpacity
          onPress={handleWishlist}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: 'rgba(255,255,255,0.9)',
            padding: 8,
            borderRadius: 20,
          }}
        >
          <Feather name="heart" size={18} color="#EF4444" />
        </TouchableOpacity>

        {/* Gradient-like overlay: use a semi-transparent View */}
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: 12,
            backgroundColor: 'rgba(0,0,0,0.55)',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }} numberOfLines={2}>
            {trip.title || trip.name || 'Destination'}
          </Text>

          {trip.rating != null && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
              <Feather name="star" size={12} color="#FCD34D" />
              <Text style={{ color: '#fff', fontSize: 12, marginLeft: 6 }}>
                {String(trip.rating)}
              </Text>
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

  const spacerItem = { id: 'spacer-left' };
  const spacerItemRight = { id: 'spacer-right' };
  const itemsWithSpacers = [spacerItem, ...trips, spacerItemRight];

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  return (
    <View style={{ marginTop: 24 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 8 }}>
        <Text style={{ color: '#fff', fontWeight: '800', fontSize: 16 }}>RECOMMENDED</Text>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather name="chevron-right" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <View style={{ height: 240 }}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
          snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
          decelerationRate="fast"
          onScroll={handleScroll}
          onScrollBeginDrag={() => setIsScrolling(true)}
          onMomentumScrollEnd={() => setIsScrolling(false)}
          scrollEventThrottle={16}
        >
          {itemsWithSpacers.map((item, index) => {
            if (item.id === 'spacer-left' || item.id === 'spacer-right') {
              return <View key={item.id} style={{ width: SPACER }} />;
            }

            const tripIndex = index - 1;
            return (
              <RecommendedCard
                key={item.id ?? tripIndex}
                trip={item}
                index={tripIndex}
                scrollX={scrollX}
              />
            );
          })}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

export default RecommendedSection;
