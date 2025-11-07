import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const FilterChip = ({ label, icon, isActive, onPress }) => (
  <TouchableOpacity
    onPress={() => {
      console.log('🏷️ Filter chip pressed:', label);
      onPress();
    }}
    className={`px-4 py-2.5 rounded-full mr-2 flex-row items-center ${
      isActive ? 'bg-blue-500' : 'bg-gray-700'
    }`}
    activeOpacity={0.9}
  >
    {icon && <Feather name={icon} size={14} color="white" className="mr-2" />}
    <Text className="text-white text-sm font-medium">{label}</Text>
  </TouchableOpacity>
);

const FilterChips = ({ selectedFilters, onFilterChange }) => {
  console.log('🎯 Rendering FilterChips');

  const filters = [
    { key: 'duration', label: '3 Days', icon: 'calendar' },
    { key: 'rating', label: '5 Stars', icon: 'star' },
    { key: 'priceRange', label: '$1,000 - $2,000', icon: 'dollar-sign' },
    { key: 'packageType', label: 'All Packages', icon: null }
  ];

  return (
    <View className="py-4 px-4">
      <Text className="text-white text-lg font-bold mb-3">Customize Your Journey</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {filters.map((filter, index) => (
          <FilterChip
            key={index}
            label={filter.label}
            icon={filter.icon}
            isActive={selectedFilters[filter.key] === filter.label}
            onPress={() => onFilterChange(filter.key, filter.label)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FilterChips;