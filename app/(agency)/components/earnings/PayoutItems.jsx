import React from 'react';
import { View, Text } from 'react-native';

const PayoutItem = ({ item }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'successful':
        return 'text-green-500';
      case 'pending':
        return 'text-blue-400';
      case 'cancel':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  const formatAmount = (value) => {
    return `₹ ${value.toLocaleString('en-IN')}`;
  };

  return (
    <View className="flex-row justify-between items-center py-4 border-b border-gray-800">
      <View className="flex-1">
        <Text className="text-white text-base font-medium">{item.month}</Text>
      </View>
      <View className="items-end">
        <Text className={`text-base font-semibold ${getStatusColor(item.status)}`}>
          {item.status}
        </Text>
      </View>
    </View>
  );
};

export default PayoutItem;