import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BookingItemCard = ({ booking, onConfirm, onCancel, onDetails }) => {
  const getBadgeColor = (badge) => {
    switch (badge.toLowerCase()) {
      case 'paid':
        return 'bg-gray-700 text-gray-300';
      case 'confirmed':
        return 'bg-green-900/30 text-green-400';
      case 'pending':
        return 'bg-yellow-900/30 text-yellow-400';
      case 'awaiting':
        return 'bg-blue-900/30 text-blue-400';
      case 'refund':
        return 'bg-blue-900/30 text-blue-400';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <View className="bg-[#1A1B23] rounded-2xl p-4 mb-4">
      {/* Header with name and menu */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-white text-lg font-semibold mb-1">{booking.customerName}</Text>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-gray-400 text-sm mr-1">{booking.phone}</Text>
            <Ionicons name="call" size={14} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Package name */}
      <Text className="text-white text-base mb-3">{booking.package}</Text>

      {/* Dates */}
      <View className="flex-row justify-between mb-3">
        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={16} color="#9CA3AF" />
          <Text className="text-gray-400 text-sm ml-2">Booked: {booking.bookedDate}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={16} color="#9CA3AF" />
          <Text className="text-gray-400 text-sm ml-2">Travel: {booking.travelDate}</Text>
        </View>
      </View>

      {/* Badges */}
      <View className="flex-row items-center mb-4">
        {booking.badges.map((badge, index) => (
          <View key={index} className={`${getBadgeColor(badge)} px-3 py-1 rounded-full mr-2`}>
            <Text className={`text-xs font-medium ${getBadgeColor(badge).split(' ')[1]}`}>
              {badge}
            </Text>
          </View>
        ))}
      </View>

      {/* Action buttons */}
      <View className="flex-row space-x-2">
        {booking.bookingStatus !== 'Cancelled' && (
          <>
            <TouchableOpacity 
              onPress={onConfirm}
              className="flex-1 bg-white/10 rounded-lg py-3 flex-row items-center justify-center"
            >
              <Ionicons name="checkmark" size={18} color="#10B981" />
              <Text className="text-green-400 text-sm font-medium ml-1">Confirm</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={onCancel}
              className="flex-1 bg-white/10 rounded-lg py-3 flex-row items-center justify-center"
            >
              <Ionicons name="close" size={18} color="#EF4444" />
              <Text className="text-red-400 text-sm font-medium ml-1">Cancel</Text>
            </TouchableOpacity>
          </>
        )}
        
        <TouchableOpacity 
          onPress={onDetails}
          className={`${booking.bookingStatus === 'Cancelled' ? 'flex-1' : 'flex-1'} bg-blue-600 rounded-lg py-3 flex-row items-center justify-center`}
        >
          <Ionicons name="eye-outline" size={18} color="white" />
          <Text className="text-white text-sm font-medium ml-1">Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingItemCard;