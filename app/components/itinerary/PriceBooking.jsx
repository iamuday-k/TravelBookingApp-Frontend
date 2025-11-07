import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const PriceBooking = ({ price, currency = "USD", packageId }) => {
  console.log('💰 Rendering PriceBooking');

  return (
    <View className="px-4 py-6">
      <Text className="text-white text-2xl font-bold mb-4">Price & Booking</Text>

      {/* Number of Travelers */}
      <View className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
        <Text className="text-gray-700 text-base">Number of Travelers</Text>
        <Feather name="chevron-right" size={20} color="#6B7280" />
      </View>

      {/* Dates */}
      <View className="bg-white rounded-xl p-4 mb-4 flex-row items-center justify-between">
        <Text className="text-gray-700 text-base">Dates</Text>
        <Feather name="chevron-right" size={20} color="#6B7280" />
      </View>

      {/* Book Now Button */}
      <TouchableOpacity
        onPress={() => {
          console.log('📅 Book Now pressed, navigating to booking');
          router.push({ pathname: '/Booking', params: { id: packageId || 'goa-pkg-1' } });
        }}
        className="bg-yellow-500 rounded-full py-4 mb-3"
        activeOpacity={0.9}
      >
        <Text className="text-gray-900 text-center font-bold text-base">
          Book Now For ${price}
        </Text>
      </TouchableOpacity>

      {/* Chat with Agency Button */}
      <TouchableOpacity
        onPress={() => console.log('💬 Chat with Agency pressed')}
        className="bg-yellow-500 rounded-full py-4"
        activeOpacity={0.9}
      >
        <Text className="text-gray-900 text-center font-bold text-base">
          Chat With Agency
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PriceBooking;