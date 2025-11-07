// components/search/SearchHeader.jsx
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const SearchHeader = ({ searchQuery, onSearchChange }) => {
  const handleBack = () => {
    console.log('Search header - back pressed');
    router.back();
  };

  return (
    <View className="pt-12 pb-6 px-4 bg-primary border-b-2 border-primary">
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Search</Text>
        <View style={{ width: 24 }} />
      </View>

      <View className="bg-primary border border-white rounded-full px-4 py-1 flex-row items-center">
        <Feather name="search" size={20} color="#ffff" />
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Where to go"
          placeholderTextColor="#ffff"
          className="flex-1 ml-3 text-white text-base"
        />
      </View>
    </View>
  );
};

export default SearchHeader;