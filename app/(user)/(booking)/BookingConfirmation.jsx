import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const BookingConfirmationPage = () => {
  console.log('📄 Rendering BookingConfirmationPage');

  const { id } = useLocalSearchParams();
  const { confirmation } = useSelector(state => state.booking);

  // Mock data for display
  const bookingData = {
    packageName: "Parisian Getaway",
    location: "Paris, France",
    duration: "5 nights",
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800",
    userName: "Amelia",
    dates: "July 15 - July 20, 2024",
    travelers: 2,
    hotel: "The Ritz Paris",
    amount: 5500,
    paymentMethod: "Visa **** 1234"
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {/* Header */}
        <View className="pt-12 px-4 pb-6">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => {
                console.log('✕ Close pressed');
                router.replace('/(tabs)/home');
              }}
              className="w-10 h-10 items-center justify-center"
            >
              <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold">Booking Confirmation</Text>
            <View className="w-10" />
          </View>
        </View>

        {/* Confirmation Message */}
        <View className="px-4 py-6">
          <Text className="text-white text-3xl font-bold text-center mb-3">
            Booking Confirmed!
          </Text>
          <Text className="text-gray-300 text-center text-base leading-6">
            Thank you, {bookingData.userName}, for choosing us. Your luxury travel experience is now confirmed.
          </Text>
        </View>

        {/* Package Card */}
        <View className="px-4 mb-6">
          <View className="bg-gray-800 rounded-2xl overflow-hidden">
            <Image
              source={{ uri: bookingData.image }}
              className="w-full h-52"
              resizeMode="cover"
            />
            <View className="p-4">
              <Text className="text-white text-2xl font-bold mb-1">
                {bookingData.packageName}
              </Text>
              <Text className="text-blue-400 text-base mb-2">{bookingData.location}</Text>
              <Text className="text-blue-400 text-sm">{bookingData.duration}</Text>
            </View>
          </View>
        </View>

        {/* Booking Details */}
        <View className="px-4">
          <View className="border-t border-gray-700 pt-6">
            {/* Dates & Duration */}
            <View className="flex-row justify-between mb-4">
              <View className="flex-1">
                <Text className="text-blue-400 text-sm font-semibold mb-1">Dates</Text>
                <Text className="text-white text-base">{bookingData.dates}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-blue-400 text-sm font-semibold mb-1">Duration</Text>
                <Text className="text-white text-base">{bookingData.duration}</Text>
              </View>
            </View>

            {/* Travelers & Hotel */}
            <View className="flex-row justify-between mb-6">
              <View className="flex-1">
                <Text className="text-blue-400 text-sm font-semibold mb-1">Travelers</Text>
                <Text className="text-white text-base">{bookingData.travelers}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-blue-400 text-sm font-semibold mb-1">Hotel</Text>
                <Text className="text-white text-base">{bookingData.hotel}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Details */}
        <View className="px-4 py-6">
          <Text className="text-white text-2xl font-bold mb-6">Payment Details</Text>
          
          <View className="border-t border-gray-700 pt-4">
            <View className="flex-row justify-between mb-4">
              <View className="flex-1">
                <Text className="text-blue-400 text-sm font-semibold mb-1">Amount Paid</Text>
                <Text className="text-white text-base">${bookingData.amount.toLocaleString()}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-blue-400 text-sm font-semibold mb-1">Payment Method</Text>
                <Text className="text-white text-base">{bookingData.paymentMethod}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-4 py-4">
          <TouchableOpacity
            onPress={() => {
              console.log('📥 Download Itinerary pressed');
            }}
            className="bg-white rounded-full py-4 mb-3"
            activeOpacity={0.9}
          >
            <Text className="text-gray-900 text-center font-bold text-base">
              Download Itinerary
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log('📋 View Itinerary pressed');
              router.push({ pathname: '/itinerary', params: { id: 'goa-pkg-1' } });
            }}
            className="bg-blue-500 rounded-full py-4 mb-6"
            activeOpacity={0.9}
          >
            <Text className="text-white text-center font-bold text-base">
              View Itinerary
            </Text>
          </TouchableOpacity>

          <Text className="text-gray-400 text-center text-sm mb-4">
            Our concierge team is ready to assist you with any requests or questions.
          </Text>
        </View>

        {/* Contact Section */}
        <View className="px-4 pb-8">
          <Text className="text-white text-2xl font-bold mb-4">Contact</Text>
          
          <TouchableOpacity
            onPress={() => console.log('💬 Chat with Concierge pressed')}
            className="bg-white rounded-full py-4 mb-3"
            activeOpacity={0.9}
          >
            <Text className="text-gray-900 text-center font-bold text-base">
              Chat with Concierge
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log('📞 Contact Support pressed')}
            className="bg-blue-500 rounded-full py-4"
            activeOpacity={0.9}
          >
            <Text className="text-white text-center font-bold text-base">
              Contact Support
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingConfirmationPage;