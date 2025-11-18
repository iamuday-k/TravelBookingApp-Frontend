import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const TripCard = ({ trip, onPress, onShare, onWishlist }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('Trip card pressed:', trip.package);
        onPress(trip.id);
      }}
      className="bg-gray-800 rounded-2xl mb-4 mx-4 overflow-hidden"
      activeOpacity={0.9}
    >
      <View className="relative">
        <Image 
          source={{ uri: trip.image }} 
          className="w-full h-52"
          resizeMode="cover"
        />
        
        {/* Action Icons */}
        <View className="absolute top-4 left-4 flex-row">
          <TouchableOpacity
            className="bg-gray-900/70 p-2 rounded-full mr-2"
            activeOpacity={0.9}
            onPress={() => {
              console.log('Share pressed for:', trip.package);
              onShare?.(trip.id);
            }}
          >
            <Feather name="share-2" size={20} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity
            className="bg-gray-900/70 p-2 rounded-full"
            activeOpacity={0.9}
            onPress={() => {
              console.log('Wishlist pressed for:', trip.package);
              onWishlist?.(trip.id);
            }}
          >
            <Feather name="heart" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-4">
        <Text className="text-white font-pbold text-lg mb-2">
          {trip.package}
        </Text>
        
        <Text className="text-gray-400 text-sm mb-1">
          {trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'} · {trip.hotel}
        </Text>
        
        <View className="flex-row items-center justify-between mt-3">
          <Text className="text-gray-400 text-sm">
            {trip.nights} nights
          </Text>
          
          <TouchableOpacity
            className="bg-yellow-400 px-4 py-2 rounded-xl"
            activeOpacity={0.9}
            onPress={() => {
              const action = trip.status === 'upcoming' ? 'View Itinerary' : 'Manage Booking';
              console.log(`${action} pressed for:`, trip.package);
              onPress(trip.id);
            }}
          >
            <Text className="text-gray-900 font-semibold text-sm">
              {trip.status === 'upcoming' ? 'View Itinerary' : 'Manage Booking'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TripCard;