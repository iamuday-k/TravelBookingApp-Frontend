import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { usePackages } from '../../../hooks/usePackage';
import PackagesHeader from '../components/packages/PackageHeader';
import PackagesSection from '../components/packages/PackagesSection';
import TravelerReviews from '../components/packages/TravelersReview';
import { router } from 'expo-router';

const PackagesPage = () => {
  console.log('📄 Rendering PackagesPage');

  const {
    popularPackages,
    domesticPackages,
    internationalPackages,
    loading,
    error
  } = usePackages();

  const handlePackagePress = (packageId) => {
    console.log('🎯 Navigating to package details:', packageId);
    router.push({ pathname: '/packageDetails', params: { id: packageId } });
  };

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-red-400 text-center">{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {/* Header with Rating */}
        <PackagesHeader />

        {/* Loading State for Initial Load */}
        {loading && popularPackages.length === 0 && domesticPackages.length === 0 ? (
          <View className="py-20 items-center">
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text className="text-gray-400 mt-4">Loading packages...</Text>
          </View>
        ) : (
          <>
            {/* Popular Packages */}
            <View className="mt-6">
              <PackagesSection
                title="Popular Packages"
                packages={popularPackages}
                onPackagePress={handlePackagePress}
              />
            </View>

            {/* Domestic Packages */}
            <PackagesSection
              title="Domestic Packages"
              packages={domesticPackages}
              onPackagePress={handlePackagePress}
            />

            {/* International Packages */}
            <PackagesSection
              title="International Packages"
              packages={internationalPackages}
              onPackagePress={handlePackagePress}
            />

            {/* Traveler Reviews */}
            <TravelerReviews />
          </>
        )}

        {/* Loading indicator for pagination */}
        {loading && (popularPackages.length > 0 || domesticPackages.length > 0) && (
          <View className="py-4">
            <ActivityIndicator size="small" color="#3B82F6" />
          </View>
        )}

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PackagesPage;