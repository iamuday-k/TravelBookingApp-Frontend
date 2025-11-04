import { ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfile } from '../../hooks/useProfile';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileInfo from '../components/profile/ProfileInfo';
import SettingsSection from '../components/profile/SettingsSection';
import AdditionalSettings from '../components/profile/AdditionalSettings';
import ReviewLinks from '../components/profile/ReviewLinks';

const ProfilePage = () => {
  const { profile, loading, error, handleToggleNotification } = useProfile();

  const handleEditProfile = () => {
    console.log('Edit Profile clicked - Profile data:', profile);
    // Add navigation to edit profile screen here
  };

  if (loading && !profile) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900 items-center justify-center">
        <ActivityIndicator size="large" color="#3B82F6" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900 items-center justify-center">
        <Text className="text-red-400 text-base">{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ProfileHeader />
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <ProfileInfo 
          profile={profile} 
          onEditPress={handleEditProfile}
        />
        
        <SettingsSection 
          profile={profile}
          onToggleNotification={handleToggleNotification}
        />
        
        <AdditionalSettings profile={profile} />
        
        <ReviewLinks />
        
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;