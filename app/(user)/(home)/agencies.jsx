// app/(tabs)/agencies.jsx
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useAgencies } from '../../../hooks/useAgencies';
import AgencyHeader from '../components/agencies/AgencyHeader';
import LocationFilter from '../components/agencies/LocationFilter';
import AgencyList from '../components/agencies/AgencyList';

const AgenciesPage = () => {
  // Get tier from route params (elite, premium, or verified)
  const { tier = 'elite' } = useLocalSearchParams();

  const {
    agencies,
    selectedLocation,
    loading,
    error,
    handleLocationFilter,
    handleToggleWishlist,
    isInWishlist,
    loadMore,
  } = useAgencies(tier);

  console.log('AgenciesPage rendered with tier:', tier);
  console.log('Agencies count:', agencies.length);

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900">
        <AgencyHeader tier={tier} />
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-red-400 text-lg text-center">{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <AgencyHeader tier={tier} />
      
      <LocationFilter
        selectedLocation={selectedLocation}
        onSelectLocation={handleLocationFilter}
        tier={tier}
      />

      {loading && agencies.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FBBF24" />
        </View>
      ) : (
        <AgencyList
          agencies={agencies}
          tier={tier}
          loading={loading}
          isInWishlist={isInWishlist}
          onToggleWishlist={handleToggleWishlist}
          onLoadMore={loadMore}
        />
      )}
    </SafeAreaView>
  );
};

export default AgenciesPage;