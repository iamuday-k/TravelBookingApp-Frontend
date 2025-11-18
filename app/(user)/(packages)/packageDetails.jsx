import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { usePackageDetails } from '../../../hooks/usePackageDetails';
import PackageDetailsHeader from '../components/packageDetails/PackageDetailsHeader';
import FilterChips from '../components/packageDetails/FilterChip';
import AvailablePackageCard from '../components/packageDetails/AvailablePackageCard';
import ExperienceChips from '../components/packageDetails/ExperienceChip';
import CustomizeButton from '../components/packageDetails/CustomizeButton';

const PackageDetailsPage = () => {
  console.log('📄 Rendering PackageDetailsPage');

  const { id } = useLocalSearchParams();
  const { details, selectedFilters, loading, error, updateFilter } = usePackageDetails(id);

  const handleItineraryPress = (packageId) => {
    console.log('📋 Navigate to itinerary:', packageId);
    router.push({ pathname: '/itinerary', params: { id: packageId } });
  };

  const handleCustomizePress = () => {
    console.log('🎨 Navigate to customize package');
    // router.push({ pathname: '/customize-package', params: { id } });
  };

  if (loading && !details) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-400 mt-4">Loading package details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-red-400 text-center">{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!details) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {/* Header with Background Image */}
        <PackageDetailsHeader
          image={details.headerImage}
          title={details.name}
          subtitle={details.description}
          tagline={details.tagline}
        />

        {/* Filter Chips */}
        <FilterChips
          selectedFilters={selectedFilters}
          onFilterChange={updateFilter}
        />

        {/* Available Packages Section */}
        <View className="px-4 mt-4">
          <Text className="text-white text-xl font-bold mb-4">Available Packages</Text>
          
          {details.packages && details.packages.map((pkg) => (
            <AvailablePackageCard
              key={pkg.id}
              package={pkg}
              onItineraryPress={handleItineraryPress}
            />
          ))}
        </View>

        {/* Experience Chips */}
        <ExperienceChips experiences={details.experiences} />

        {/* Customize Button */}
        <View className="py-6">
          <CustomizeButton onPress={handleCustomizePress} />
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PackageDetailsPage;