import React from 'react';
import { View, ScrollView, Text, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';


import { useHomeData } from '../../Hooks/useHomeData';
import Loader from '../components/common/Loader';
import SearchBar from '../components/home/SearchBar';
import RecommendedSection from '../components/home/RecommendationSection';
import AgencySection from '../components/home/AgencySection';
import PromotionSection from '../components/home/PromotionCard';
import DestinationSection from '../components/home/DestinationCard';
import TestimonialSection from '../components/home/TestimonialCard';


const Home = () => {
  const {
    loading,
    error,
    trips = [],
    relevantAgencies = {
      elite: [],
      premium: [],
      verified: [],
      welcomeGift: []
    },
    promotions = [],
    spiritualDestinations = [],
    popularDestinations = [],
    testimonials = [],
    refetch,
  } = useHomeData();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [refetch]);

  if (loading && !refreshing) {
    return <Loader />;
  }
//   if (!relevantAgencies) {
//   return <Loader />;
// }

  if (error && !trips.length) {
    return (
      <SafeAreaView className="flex-1 bg-[#0A1828]">
        <StatusBar style="light" />
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-red-400 text-lg font-semibold mb-2">
            {error.error || 'Error'}
          </Text>
          <Text className="text-gray-400 text-center mb-4">
            {error.message || 'Failed to load data'}
          </Text>
          <TouchableOpacity
            onPress={refetch}
            className="bg-blue-500 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0A1828]">
      <StatusBar style="light" />
      
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#4A90E2"
          />
        }
      >
        {/* Header */}
        <View className="px-4 pt-4 pb-2">
          <Text className="text-gray-400 text-sm">Explore the</Text>
          <Text className="text-white text-2xl font-bold">
            Beautiful <Text className="text-blue-400">World</Text>
          </Text>
        </View>

        {/* Search Bar */}
        <SearchBar />

        {/* Categories - Static for now */}
        <View className="flex-row px-4 mt-4 space-x-4">
          {['Trending', 'Tracking', 'Beach', 'Edu'].map((category) => (
            <TouchableOpacity
              key={category}
              className={`px-4 py-2 rounded-full ${
                category === 'Trending' ? 'bg-blue-500' : 'bg-gray-700'
              }`}
            >
              <Text className="text-white text-sm">{category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommended Section */}
        <RecommendedSection trips={trips} />
       
        {/* Elite Agency Section */}
        <AgencySection
          title="Elite Agency"
          agencies={relevantAgencies?.elite || []}
          type="elite"
        />

        {/* Premium Agency Section */}
        <AgencySection
          title="Premium Agency"
          agencies={relevantAgencies?.premium || []}
          type="premium"
        />

        {/* Verified Agency Section */}
        <AgencySection
          title="Verified Agency"
          agencies={relevantAgencies?.verified || []}
          type="verified"
        />

        {/* Welcome Gift/Promotions Section */}
        {relevantAgencies.welcomeGift && relevantAgencies.welcomeGift.length > 0 ? (
          <AgencySection
            title="Welcome Gift"
            agencies={relevantAgencies.welcomeGift}
            type="welcomeGift"
          />
        ) : (
          <PromotionSection promotions={promotions} />
        )}

        {/* Spiritual Destinations */}
        <DestinationSection
          title="Spiritual Destinations"
          destinations={spiritualDestinations}
        />

        {/* Popular Destinations */}
        <DestinationSection
          title="World Tour"
          destinations={popularDestinations}
        />

        {/* Testimonials */}
        <TestimonialSection testimonials={testimonials} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;