import React from 'react';
import { View, Text } from 'react-native';

const EarningsStatCard = ({ label, amount }) => {
  const formatAmount = (value) => {
    // Handle undefined, null, or non-numeric values
    const numValue = Number(value) || 0;
    return `₹ ${numValue.toLocaleString('en-IN')}`;
  };

  return (
    <View className="flex-1">
      <Text className="text-gray-400 text-xs mb-1">{label}</Text>
      <Text className="text-white text-lg font-semibold">{formatAmount(amount)}</Text>
    </View>
  );
};

export default EarningsStatCard;