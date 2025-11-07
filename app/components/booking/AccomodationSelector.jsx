import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const AccommodationCard = ({ accommodation, isSelected, onSelect }) => (
  <TouchableOpacity
    onPress={() => {
      console.log('🏨 Accommodation selected:', accommodation.name);
      onSelect(accommodation);
    }}
    className={`rounded-2xl overflow-hidden mb-4 ${
      isSelected ? 'border-2 border-yellow-400' : 'border-2 border-transparent'
    }`}
    activeOpacity={0.9}
  >
    <View className="relative">
      <Image
        source={{ uri: accommodation.image }}
        className="w-full h-48"
        resizeMode="cover"
      />
      {isSelected && (
        <View className="absolute top-3 right-3 bg-yellow-400 rounded-full p-2">
          <Feather name="check" size={16} color="#111827" />
        </View>
      )}
    </View>
    <View className="bg-gray-800 p-4">
      <Text className="text-white font-bold text-lg mb-1">{accommodation.name}</Text>
      <Text className="text-blue-400 text-sm">{accommodation.type}</Text>
    </View>
  </TouchableOpacity>
);

const AccommodationSelector = ({ accommodations = [], selected, onSelect }) => {
  console.log('🏨 Rendering AccommodationSelector');

  return (
    <View className="px-4 py-6">
      <Text className="text-white text-2xl font-bold mb-2">Accommodation</Text>
      <Text className="text-yellow-400 text-sm mb-4">Selected</Text>

      {accommodations.map((acc) => (
        <AccommodationCard
          key={acc.id}
          accommodation={acc}
          isSelected={selected?.id === acc.id}
          onSelect={onSelect}
        />
      ))}
    </View>
  );
};

export default AccommodationSelector;