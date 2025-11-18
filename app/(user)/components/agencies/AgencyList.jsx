// components/agencies/AgencyList.jsx
import React from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import AgencyCard from './AgencyCard';

const AgencyList = ({
  agencies,
  tier,
  loading,
  isInWishlist,
  onToggleWishlist,
  onLoadMore,
}) => {
  const renderItem = ({ item }) => (
    <AgencyCard
      agency={item}
      tier={tier}
      isInWishlist={isInWishlist(item.id)}
      onToggleWishlist={onToggleWishlist}
    />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View className="py-6">
        <ActivityIndicator size="large" color="#FBBF24" />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View className="flex-1 items-center justify-center py-20">
        <Text className="text-gray-400 text-lg">No agencies found</Text>
        <Text className="text-gray-500 text-sm mt-2">
          Try selecting a different location
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={agencies}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerClassName="pb-6 pt-2"
      showsVerticalScrollIndicator={false}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default AgencyList;