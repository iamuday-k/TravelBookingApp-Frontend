import { View, Text, TouchableOpacity } from 'react-native';

const TripsTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <View className="flex-row px-4 mb-4">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => {
            console.log(`${tab.label} tab pressed`);
            onTabChange(tab.id);
          }}
          className="mr-6"
          activeOpacity={0.9}
        >
          <Text 
            className={`text-lg font-semibold pb-2 ${
              activeTab === tab.id ? 'text-Gold' : 'text-gray-500'
            }`}
          >
            {tab.label}
          </Text>
          {activeTab === tab.id && (
            <View className="h-1 bg-yellow-400 rounded-full" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TripsTabs;