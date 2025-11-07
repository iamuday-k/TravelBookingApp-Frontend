import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

const TimelineItem = ({ day, title, description, isLast }) => (
  <View className="flex-row mb-6">
    {/* Timeline */}
    <View className="items-center mr-4">
      <View className="w-8 h-8 bg-yellow-400 rounded-full items-center justify-center">
        <Feather name="map-pin" size={16} color="#111827" />
      </View>
      {!isLast && <View className="flex-1 w-0.5 bg-gray-700 mt-2" style={{ minHeight: 40 }} />}
    </View>

    {/* Content */}
    <View className="flex-1 pb-2">
      <Text className="text-yellow-400 text-sm font-semibold mb-1">
        Day {day}: {title}
      </Text>
      <Text className="text-gray-300 text-sm leading-5">{description}</Text>
    </View>
  </View>
);

const ItineraryTimeline = ({ items = [] }) => {
  console.log('🗓️ Rendering ItineraryTimeline');

  return (
    <View className="px-4 py-6">
      <Text className="text-white text-2xl font-bold mb-6">Itinerary</Text>
      
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          day={item.day}
          title={item.title}
          description={item.description}
          isLast={index === items.length - 1}
        />
      ))}
    </View>
  );
};

export default ItineraryTimeline;