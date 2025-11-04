import { View, Text } from 'react-native';

const AdditionalSettings = ({ profile }) => {
  return (
    <View className="px-4 py-6">
      <Text className="text-white text-xl font-bold mb-4">Additional Settings</Text>
      
      {/* Currency */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-white text-base">Currancy</Text>
        <Text className="text-white text-base">{profile?.settings?.currency || 'Rupee'}</Text>
      </View>

      {/* Language */}
      <View className="flex-row items-center justify-between">
        <Text className="text-white text-base">Language</Text>
        <Text className="text-white text-base">{profile?.settings?.language || 'English'}</Text>
      </View>
    </View>
  );
};

export default AdditionalSettings;