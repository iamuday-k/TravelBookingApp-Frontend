import { View, Text, Image, TouchableOpacity } from 'react-native';

const ProfileInfo = ({ profile, onEditPress }) => {
  const profileImage = require('../../../../assets/images/profile.png');

  return (
    <View className="items-center px-4 py-6 flex-row">
        <View>
      <Image 
        source={profileImage}
        className="w-24 h-24 rounded-full mb-4"
      />
      </View>

      <View className="mx-10">
      <Text className="text-white text-xl font-bold mb-1">
        {profile?.name || 'User Name'}
      </Text>
      <Text className="text-gray-400 text-sm mb-1">
        {profile?.email || 'username@gmail.com'}
      </Text>
      <Text className="text-gray-400 text-sm mb-1">
        {profile?.phone || '+91 1234567890'}
      </Text>
      <Text className="text-gray-400 text-sm mb-4">
        {profile?.address || '1234 Main St, City, Country'}
      </Text>
      
      <TouchableOpacity
        className="bg-blue-500 px-8 py-3 rounded-xl"
        activeOpacity={0.9}
        onPress={() => {
          console.log('Edit Profile button pressed');
          onEditPress();
        }}
      >
        <Text className="text-white font-semibold text-base">Edit Profile</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileInfo;