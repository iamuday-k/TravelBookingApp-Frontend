import { View, Text } from 'react-native';

const TripOverview = ({ title, description }) => {
  console.log('📝 Rendering TripOverview');

  return (
    <View className="px-4 py-6">
      <Text className="text-white text-2xl font-bold mb-3">{title}</Text>
      <Text className="text-gray-300 text-sm leading-6">{description}</Text>
    </View>
  );
};

export default TripOverview;