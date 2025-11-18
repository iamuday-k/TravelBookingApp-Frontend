import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useItinerary } from '../../../hooks/useItinerary';
import ItineraryHeader from '../components/itinerary/ItineraryHeader';
import TripOverview from '../components/itinerary/TripOverview';
import InclusionsExclusions from '../components/itinerary/InclusionsExclusions';
import ItineraryTimeline from '../components/itinerary/ItineraryTimeline';
import PriceBooking from '../components/itinerary/PriceBooking';
import GallerySection from '../components/itinerary/GallerySection';

const ItineraryPage = () => {
  console.log('📄 Rendering ItineraryPage');

  const { id } = useLocalSearchParams();
  const { itinerary, loading, error } = useItinerary(id);

  if (loading && !itinerary) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-400 mt-4">Loading itinerary...</Text>
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

  if (!itinerary) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {/* Header with Rating */}
        <ItineraryHeader
          image={itinerary.headerImage}
          rating={itinerary.rating}
          totalReviews={itinerary.totalReviews}
          ratingBreakdown={itinerary.ratingBreakdown}
        />

        {/* Trip Overview */}
        <TripOverview
          title={itinerary.title}
          description={itinerary.description}
        />

        {/* Inclusions & Exclusions */}
        <InclusionsExclusions inclusions={itinerary.inclusions} />

        {/* Itinerary Timeline */}
        <ItineraryTimeline items={itinerary.itinerary} />

        {/* Price & Booking */}
        <PriceBooking 
          price={itinerary.price} 
          currency={itinerary.currency}
          packageId={id}
        />

        {/* Gallery */}
        <GallerySection images={itinerary.gallery} />

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItineraryPage;