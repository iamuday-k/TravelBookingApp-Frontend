import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAgencyBookings } from '../../../hooks/useAgencyBooking';
import BookingStatCard from '../components/bookings/BookingStatCard';
import BookingItemCard from '../components/bookings/BookingItemCard';
import FilterDropdown from '../components/bookings/FilterDropdown';

const MyBookings = () => {
  const {
    stats,
    bookings,
    status,
    error,
    searchQuery,
    filters,
    handleSearch,
    handleDateFilter,
    handlePackageFilter,
    handleStatusFilter,
    handleClearFilters,
  } = useAgencyBookings();

  const dateOptions = [
    { label: 'All Dates', value: null },
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
  ];

  const packageOptions = [
    { label: 'All Packages', value: null },
    { label: 'Goa Beach Paradise', value: 'Goa Beach Paradise - 5N/6D' },
    { label: 'Kerala Backwaters', value: 'Kerala Backwaters - 4N/5D' },
    { label: 'Rajasthan Royal Tour', value: 'Rajasthan Royal Tour - 7N/8D' },
  ];

  const statusOptions = [
    { label: 'All Status', value: null },
    { label: 'Paid', value: 'paid' },
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
  ];

  const handleConfirm = (bookingId) => {
    console.log('Confirm booking:', bookingId);
  };

  const handleCancel = (bookingId) => {
    console.log('Cancel booking:', bookingId);
  };

  const handleDetails = (bookingId) => {
    console.log('View details:', bookingId);
  };

  const renderHeader = () => (
    <View className="px-5 pb-4">
      <View className="flex-row justify-between items-center mb-6 mt-2">
        <Text className="text-white text-2xl font-bold">My Bookings</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View className="flex-row mb-6 -mx-1">
        <BookingStatCard
          icon="calendar"
          count={stats.total}
          label="Total Bookings"
          bgColor="bg-blue-600"
          iconColor="white"
        />
        <BookingStatCard
          icon="checkmark-circle"
          count={stats.confirmed}
          label="Confirmed"
          bgColor="bg-green-600"
          iconColor="white"
        />
        <BookingStatCard
          icon="time"
          count={stats.pending}
          label="Pending"
          bgColor="bg-yellow-600"
          iconColor="white"
        />
      </View>

      {/* Search Bar */}
      <View className="bg-[#1A1B23] rounded-lg px-4 py-3 flex-row items-center mb-4">
        <Ionicons name="search" size={20} color="#9CA3AF" />
        <TextInput
          placeholder="Search by customer name..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={handleSearch}
          className="flex-1 text-white ml-3"
        />
      </View>

      {/* Filters */}
      <View className="flex-row items-center space-x-2 mb-4">
        <View className="flex-1">
          <FilterDropdown
            label="Date"
            selectedValue={filters.dateRange}
            onSelect={handleDateFilter}
            options={dateOptions}
          />
        </View>
        <View className="flex-1">
          <FilterDropdown
            label="Package"
            selectedValue={filters.package}
            onSelect={handlePackageFilter}
            options={packageOptions}
          />
        </View>
        <View className="flex-1">
          <FilterDropdown
            label="Status"
            selectedValue={filters.status}
            onSelect={handleStatusFilter}
            options={statusOptions}
          />
        </View>
        <TouchableOpacity
          onPress={handleClearFilters}
          className="bg-transparent border border-gray-700 rounded-lg px-4 py-2.5"
        >
          <Ionicons name="funnel" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    if (status === 'loading' || status === 'idle') {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-400 mt-4">Loading bookings...</Text>
        </View>
      );
    }

    if (status === 'failed') {
      return (
        <View className="flex-1 justify-center items-center px-5">
          <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
          <Text className="text-red-500 text-lg font-semibold mt-4">Error Loading Data</Text>
          <Text className="text-gray-400 text-center mt-2">{error || 'Failed to load bookings'}</Text>
        </View>
      );
    }

    return (
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingItemCard
              key={booking.id}
              booking={booking}
              onConfirm={() => handleConfirm(booking.id)}
              onCancel={() => handleCancel(booking.id)}
              onDetails={() => handleDetails(booking.id)}
            />
          ))
        ) : (
          <View className="py-12 items-center">
            <Ionicons name="calendar-outline" size={64} color="#4B5563" />
            <Text className="text-gray-400 text-center mt-4">No bookings found</Text>
          </View>
        )}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0B0F]">
      {renderHeader()}
      {renderContent()}
    </SafeAreaView>
  );
};

export default MyBookings;