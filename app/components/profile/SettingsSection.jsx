import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SettingsSection = ({ profile, onToggleNotification }) => {
  const notificationEnabled = profile?.settings?.notificationPreferences || false;

  return (
    <View className="px-4 py-6">
      <Text className="text-white text-xl font-bold mb-4">Settings</Text>
      
      {/* Notification Preferences */}
      <View className="flex-row items-center justify-between bg-gray-800 px-4 py-4 rounded-xl mb-3">
        <Text className="text-white text-base">Notification Preferences</Text>
        <Switch
          value={notificationEnabled}
          onValueChange={() => {
            console.log('Notification toggle changed to:', !notificationEnabled);
            onToggleNotification();
          }}
          trackColor={{ false: '#374151', true: '#3B82F6' }}
          thumbColor={notificationEnabled ? '#FFFFFF' : '#9CA3AF'}
        />
      </View>

      {/* Password Reset */}
      <TouchableOpacity
        className="flex-row items-center justify-between bg-gray-800 px-4 py-4 rounded-xl"
        activeOpacity={0.9}
        onPress={() => console.log('Password Reset pressed')}
      >
        <Text className="text-white text-base">Password Reset</Text>
        <Feather name="chevron-right" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SettingsSection;