import { View, Text } from 'react-native';

const BookingSummary = ({ accommodation, dates, guests, nights = 7 }) => {
  console.log('📊 Rendering BookingSummary');

  const subtotal = accommodation ? accommodation.pricePerNight * nights : 0;
  const taxes = subtotal * 0.1;
  const total = subtotal + taxes;

  return (
    <View className="px-4 py-6">
      <Text className="text-white text-2xl font-bold mb-4">Booking Summary</Text>

      <View className="bg-gray-800 rounded-2xl p-4">
        {/* Accommodation */}
        <View className="flex-row justify-between mb-3">
          <Text className="text-yellow-400 text-sm">
            {accommodation ? accommodation.name : 'Villa Serenity'}
          </Text>
          <Text className="text-white text-sm font-semibold">{nights} Nights</Text>
        </View>

        {/* Dates */}
        <View className="flex-row justify-between mb-3">
          <Text className="text-yellow-400 text-sm">
            {dates.start && dates.end 
              ? `July ${dates.start} - July ${dates.end}, 2024`
              : 'July 15 - July 22, 2024'}
          </Text>
          <Text className="text-white text-sm font-semibold">{guests} Guests</Text>
        </View>

        {/* Divider */}
        <View className="border-t border-gray-700 my-3" />

        {/* Pricing */}
        <View className="space-y-2">
          <View className="flex-row justify-between">
            <Text className="text-gray-400 text-sm">Guests</Text>
            <Text className="text-white text-sm">USD ${subtotal.toLocaleString()}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400 text-sm">Subtotal</Text>
            <Text className="text-white text-sm">USD ${subtotal.toLocaleString()}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400 text-sm">Taxes & Fees</Text>
            <Text className="text-white text-sm">USD ${taxes.toLocaleString()}</Text>
          </View>

          {/* Divider */}
          <View className="border-t border-gray-700 my-2" />

          <View className="flex-row justify-between">
            <Text className="text-yellow-400 text-base font-bold">Total</Text>
            <Text className="text-white text-base font-bold">USD ${total.toLocaleString()}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookingSummary;