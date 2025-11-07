// app/(search)/search.jsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSearch } from '../../hooks/useSearch';
import SearchHeader from '../components/search/SearchHeader';
import SearchFilters from '../components/search/SearchFilters';
import SearchResults from '../components/search/SearchResults';

const SearchPage = () => {
  const [showFilters, setShowFilters] = useState(true);
  const {
    trips,
    relevantAgencies,
    loading,
    filters,
    updateFilters,
    performSearch
  } = useSearch();

  const handleSearchChange = (text) => {
    console.log('Search query changed:', text);
    updateFilters({ q: text });
  };

  const handleFiltersChange = (newFilters) => {
    console.log('Filters changed:', newFilters);
    updateFilters(newFilters);
  };

  const handleShowResults = () => {
    console.log('Show results pressed with filters:', filters);
    
    // Prepare search params
    const searchParams = {
      q: filters.q,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minDays: filters.minDays,
      maxDays: filters.maxDays,
      minHotelRating: filters.minHotelRating
    };

    console.log('Performing search with params:', searchParams);
    performSearch(searchParams);
    setShowFilters(false);
  };

  const handleTripPress = (tripId) => {
    console.log('Trip pressed:', tripId);
    // router.push(`/trip/${tripId}`);
  };

  const handleAgencyPress = (agencyId) => {
    console.log('Agency pressed:', agencyId);
    // router.push(`/agency/${agencyId}`);
  };

  const handleFilterToggle = () => {
    console.log('Filter toggle pressed');
    setShowFilters(!showFilters);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <SearchHeader
        searchQuery={filters.q}
        onSearchChange={handleSearchChange}
      />

      {showFilters ? (
        <View className="flex-1">
          <SearchFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />

          <View className="px-4 pb-6 flex-row  justify-center">
            <TouchableOpacity
              onPress={handleShowResults}
              className="bg-[#B2CDDA] py-4 rounded-xl items-center w-1/3"
              activeOpacity={0.9}
            >
              <Text className="text-black font-bold text-lg">Show Result</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="flex-1">
          {/* Filter button when showing results */}
          <View className="flex-row justify-end px-4 py-3">
            <TouchableOpacity
              onPress={handleFilterToggle}
              className="bg-gray-800 px-4 py-2 rounded-xl flex-row items-center"
              activeOpacity={0.9}
            >
              <Text className="text-white font-semibold mr-2">Filters</Text>
              <Text className="text-[#B2CDDA]">⚙️</Text>
            </TouchableOpacity>
          </View>

          <SearchResults
            trips={trips}
            relevantAgencies={relevantAgencies}
            loading={loading}
            onTripPress={handleTripPress}
            onAgencyPress={handleAgencyPress}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchPage;