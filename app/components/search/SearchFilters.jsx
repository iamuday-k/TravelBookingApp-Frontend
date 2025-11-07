// components/search/SearchFilters.jsx
import { View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

const SearchFilters = ({ filters, onFiltersChange }) => {
  const handleDaysChange = (increment) => {
    const newDays = Math.max(1, filters.minDays + increment);
    console.log('Days changed to:', newDays);
    onFiltersChange({ minDays: newDays, maxDays: newDays });
  };

  const handlePriceChange = (value) => {
    console.log('Price changed to:', value);
    onFiltersChange({ maxPrice: value });
  };

  const handleHotelTypeSelect = (rating) => {
    console.log('Hotel type selected:', rating);
    onFiltersChange({ minHotelRating: rating === filters.minHotelRating ? null : rating });
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <View className="px-4 py-6 bg-gray-900">
      <Text className="text-white text-2xl font-bold mb-4">Filter</Text>

      {/* Price Filter */}
      <View className="mb-6">
        <Text className="text-white text-base font-semibold mb-3">Price</Text>
        <Slider
          value={filters.maxPrice}
          onValueChange={handlePriceChange}
          minimumValue={5000}
          maximumValue={50000}
          step={1000}
          
          minimumTrackTintColor="#B2CDDA"
          maximumTrackTintColor="#374151"
          thumbTintColor="#B2CDDA"
        />
        <View className="flex-row justify-between mt-2">
          <Text className="text-gray-400 text-sm">{formatPrice(5000)}</Text>
          <Text className="text-gray-400 text-sm">{formatPrice(50000)}</Text>
        </View>
        <Text className="text-white text-center mt-2 font-semibold">
          {formatPrice(filters.maxPrice)}
        </Text>
      </View>

      {/* Days Filter */}
      <View className="my-7 mb-12 flex-row items-center">
        <Text className="text-white text-2xl font-semibold mb-3 mr-4">Days</Text>
        <View className="flex-row items-center justify-center">
          <TouchableOpacity
            onPress={() => handleDaysChange(-1)}
            className="bg-gray-800 w-8 h-8 rounded-lg items-center justify-center"
            activeOpacity={0.7}
          >
            <Text className="text-white text-2xl font-bold">-</Text>
          </TouchableOpacity>
          
          <Text className="text-white text-3xl font-bold mx-8">
            {filters.minDays}
          </Text>
          
          <TouchableOpacity
            onPress={() => handleDaysChange(1)}
            className="bg-gray-800 w-8 h-8 rounded-lg items-center justify-center"
            activeOpacity={0.7}
          >
            <Text className="text-white text-2xl font-bold">+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Hotel Type Filter */}
      <View className="mb-7">
        <Text className="text-white text-2xl font-semibold mb-3">Hotel Type</Text>
        
        {[
          { label: '5 star', value: 5 },
          { label: '4 star and above', value: 4 },
          { label: '3 star and above', value: 3 }
        ].map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => handleHotelTypeSelect(option.value)}
            className="flex-row items-center justify-between py-3 border-b border-gray-700"
            activeOpacity={0.7}
          >
            <Text className="text-white text-base">{option.label}</Text>
            <View
              className={`w-6 h-6 rounded-full border-2 ${
                filters.minHotelRating === option.value
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-400'
              } items-center justify-center`}
            >
              {filters.minHotelRating === option.value && (
                <View className="w-3 h-3 rounded-full bg-white" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SearchFilters;