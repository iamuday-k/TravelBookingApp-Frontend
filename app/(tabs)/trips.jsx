import { SafeAreaView, ActivityIndicator, View, Text } from 'react-native';
import { useTrips } from '../../hooks/useTrips';
import TripsHeader from '../components/trips/TripsHeader';
import TripsTabs from '../components/trips/TripsTabs';
import TripsList from '../components/trips/TripsList';

const TripsPage = () => {
  const { 
    trips, 
    loading, 
    error, 
    activeTab, 
    handleTabChange 
  } = useTrips();

  const handleTripPress = (tripId) => {
    console.log('Trip pressed with ID:', tripId);
    // Add navigation to trip details screen here
  };

  const handleShare = (tripId) => {
    console.log('Share trip with ID:', tripId);
    // Add share functionality here
  };

  const handleWishlist = (tripId) => {
    console.log('Add to wishlist, trip ID:', tripId);
    // Add wishlist functionality here
  };

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900 items-center justify-center">
        <Text className="text-red-400 text-base">{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <TripsHeader />
      
      <TripsTabs 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />

      {loading && trips.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      ) : (
        <TripsList 
          trips={trips} 
          loading={loading}
          onItemPress={handleTripPress}
          onShare={handleShare}
          onWishlist={handleWishlist}
        />
      )}
    </SafeAreaView>
  );
};

export default TripsPage;