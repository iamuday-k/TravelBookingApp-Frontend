// components/search/SearchResults.jsx
import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import WishlistCard from '../wishlist/WishListCard';
import AgencyCard from '../agencies/AgencyCard';

const SearchResults = ({ trips, relevantAgencies, loading, onTripPress, onAgencyPress }) => {
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-400 mt-4">Searching...</Text>
      </View>
    );
  }

  const hasTrips = trips && trips.length > 0;
  const hasElite = relevantAgencies?.elite?.length > 0;
  const hasPremium = relevantAgencies?.premium?.length > 0;
  const hasVerified = relevantAgencies?.verified?.length > 0;
  const hasAnyAgencies = hasElite || hasPremium || hasVerified;

  if (!hasTrips && !hasAnyAgencies) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <Text className="text-gray-400 text-lg">No results found</Text>
        <Text className="text-gray-500 text-sm mt-2">Try adjusting your filters</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-900">
      {/* Top Trips Section */}
      {hasTrips && (
        <View className="mb-6">
          <View className="px-4 py-3 flex-row items-center">
            <View className="bg-blue-500 w-1 h-6 mr-3 rounded-full" />
            <Text className="text-white text-xl font-bold">Goa</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {trips.map((trip, index) => (
              <View key={trip.id} className={index < trips.length - 1 ? 'mr-4' : ''} style={{ width: 180 }}>
                <WishlistCard
                  item={trip}
                  onPress={onTripPress}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Elite Agencies Section */}
      {hasElite && (
        <View className="mb-4">
          <View className="flex-row items-center justify-between px-4 py-3">
            <Text className="text-white text-xl font-bold uppercase">Elite Agency</Text>
            <View className="bg-yellow-400 px-3 py-1 rounded-full">
              <Text className="text-black font-bold text-xs">Top Pick</Text>
            </View>
          </View>
          
          {relevantAgencies.elite.map((agency) => (
            <AgencyCard
              key={agency.id}
              agency={agency}
              tier="elite"
              isInWishlist={false}
              onToggleWishlist={() => console.log('Toggle wishlist:', agency.id)}
            />
          ))}
        </View>
      )}

      {/* Premium Agencies Section */}
      {hasPremium && (
        <View className="mb-4">
          <Text className="text-white text-xl font-bold uppercase px-4 py-3">
            Premium Agency
          </Text>
          
          {relevantAgencies.premium.map((agency) => (
            <AgencyCard
              key={agency.id}
              agency={agency}
              tier="premium"
              isInWishlist={false}
              onToggleWishlist={() => console.log('Toggle wishlist:', agency.id)}
            />
          ))}
        </View>
      )}

      {/* Verified Agencies Section */}
      {hasVerified && (
        <View className="mb-4">
          <Text className="text-white text-xl font-bold uppercase px-4 py-3">
            Verified Agency
          </Text>
          
          {relevantAgencies.verified.map((agency) => (
            <AgencyCard
              key={agency.id}
              agency={agency}
              tier="verified"
              isInWishlist={false}
              onToggleWishlist={() => console.log('Toggle wishlist:', agency.id)}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default SearchResults;