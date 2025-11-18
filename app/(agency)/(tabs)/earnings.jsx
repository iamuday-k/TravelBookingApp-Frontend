import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAgencyEarnings } from '../../../hooks/useAgencyEarnings';
import EarningsStatCard from '../components/earnings/EarningStatCard';
import PayoutItem from '../components/earnings/PayoutItems';
import EarningsGraph from '../components/earnings/EarningsGraph';

const Earnings = () => {
  const router = useRouter();
  const { stats, transactions, graphData, status, error } = useAgencyEarnings();

  const renderHeader = () => (
    <View className="px-5 pb-4 border-b border-gray-800">
      <View className="flex-row items-center mb-6 mt-2">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Earnings</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    if (status === 'loading' || status === 'idle') {
      return (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#8B5CF6" />
          <Text className="text-gray-400 mt-4">Loading earnings data...</Text>
        </View>
      );
    }

    if (status === 'failed') {
      return (
        <View className="flex-1 justify-center items-center px-5">
          <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
          <Text className="text-red-500 text-lg font-semibold mt-4">Error Loading Data</Text>
          <Text className="text-gray-400 text-center mt-2">{error || 'Failed to load earnings data'}</Text>
        </View>
      );
    }

    return (
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Earning Summary */}
        <View className="px-5 py-6">
          <Text className="text-white text-xl font-bold mb-4">Earning summary</Text>
          
          {/* Stats Cards */}
          <View className="flex-row justify-between mb-6">
            <EarningsStatCard label="Total Balance" amount={stats.total} />
            <EarningsStatCard label="Available Balance" amount={stats.available} />
            <EarningsStatCard label="Pending" amount={stats.pending} />
          </View>

          {/* Graph */}
          <EarningsGraph data={graphData} />
        </View>

        {/* Payout History */}
        <View className="px-5 pb-6">
          <Text className="text-white text-xl font-bold mb-4">Payout History</Text>
          
          {transactions && transactions.length > 0 ? (
            <View>
              {transactions.map((item) => (
                <PayoutItem key={item.id} item={item} />
              ))}
            </View>
          ) : (
            <View className="py-8 items-center">
              <Text className="text-gray-400 text-center">No payout history available</Text>
            </View>
          )}

          {/* Request Payout Button */}
          <TouchableOpacity className="bg-blue-500 rounded-xl py-4 items-center mt-6">
            <Text className="text-white text-lg font-semibold">Request Payout</Text>
          </TouchableOpacity>
        </View>
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

export default Earnings;

