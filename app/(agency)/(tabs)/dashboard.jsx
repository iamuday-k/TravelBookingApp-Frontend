import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAgencyDashboard } from "../../../hooks/useAgencyDashboard";
import AgencyHeader from "../components/dashboard/AgencyHeader";
import StatCard from "../components/dashboard/StatCard";
import { PrimaryPill, OutlinePill } from "../components/dashboard/PillButtons";
import HorizontalList from "../components/dashboard/HorizontalList";
import PackageCard from "../components/dashboard/PackageCard";
import BookingItem from "../components/dashboard/BookingItem";
import EarningsCard from "../components/dashboard/EarningsCard";
import Interactions from "../components/dashboard/Interactions";
import RatingBlock from "../components/dashboard/RatingBlock";
import MiniBarChart from "../components/dashboard/MiniBarChart";

export default function AgencyDashboardPage() {
  const { data, loading, error } = useAgencyDashboard();

  if (loading && !data) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900 items-center justify-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900 items-center justify-center">
        <Text className="text-red-400">{error}</Text>
      </SafeAreaView>
    );
  }

  const { stats, samplePackages, latestBookings, interactions, ratingBreakdown, monthlyBookingsChart } = data || {};

  const Header = (
    <View>
      <AgencyHeader />
      <View className="flex-row px-4 mt-3 flex-wrap">
        <StatCard title="Total Bookings" value={stats?.totalBookings ?? 0} change={stats?.totalBookingsChange ?? 0} colors={["#ff7b7b","#ffb199"]} />
        <StatCard title="Earnings" value={`$${(stats?.totalEarnings ?? 0).toLocaleString()}`} change={stats?.totalEarningsChange ?? 0} colors={["#00d4b6","#06b6d4"]} />
        <StatCard title="Active Packages" value={stats?.activePackages ?? 0} change={stats?.activePackagesChange ?? 0} colors={["#7be28c","#c8ffb0"]} />
        <StatCard title="Ratings" value={stats?.rating ?? 0} change={stats?.ratingChange ?? 0} colors={["#f2b26e","#eccd8b"]} />
      </View>

      <View className="px-4 mt-4 flex-row justify-between">
        <View className="bg-[#0f1724] rounded-xl px-4 py-3"><Text className="text-white font-psemibold">Add Package</Text></View>
        <View className="bg-primary rounded-xl px-4 py-3"><Text className="text-white font-psemibold">Edit Package</Text></View>
      </View>

      <View className="mt-6 px-4">
        <Text className="text-white font-pblack text-xl">Sample Packages</Text>
        <FlatList
          data={samplePackages || []}
          keyExtractor={it => it.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <PackageCard item={item} onPress={() => {}} />}
          contentContainerStyle={{ paddingVertical: 12, paddingLeft: 4 }}
        />
      </View>

      <View className="px-4 mt-4">
        <Text className="text-white font-pblack text-xl">Latest Bookings</Text>
        <View className="flex-row gap-3 mt-3">
          <View className="bg-[#0f1724] px-3 py-2 rounded-xl"><Text className="text-white">All</Text></View>
          <View className="bg-primary px-3 py-2 rounded-xl"><Text className="text-white">Upcoming</Text></View>
          <View className="bg-[#0f1724] px-3 py-2 rounded-xl"><Text className="text-white">Completed</Text></View>
        </View>
      </View>
    </View>
  );

  const Footer = (
    <View>
      <View className="px-4 mt-4">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-primary font-psemibold">Earnings</Text>
            <Text className="text-white font-pblack text-xl">${(stats?.totalEarnings ?? 0).toLocaleString()}</Text>
            <Text className="text-gray-400">Total Earnings</Text>
          </View>
          <View>
            <View className="w-28 h-20 rounded-xl overflow-hidden bg-gray-700" />
          </View>
        </View>
      </View>

      <Interactions queries={interactions?.newQueries ?? 0} replies={interactions?.newReplies ?? 0} />
      <RatingBlock rating={stats?.rating ?? 0} reviewsCount={stats?.reviewsCount ?? 0} dist={ratingBreakdown || []} />
      <MiniBarChart total={monthlyBookingsChart?.total ?? 0} data={monthlyBookingsChart?.last6Months || []} />
      <View className="h-6" />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <FlatList
        data={latestBookings || []}
        keyExtractor={it => it.id}
        renderItem={({ item }) => <BookingItem item={item} />}
        ListHeaderComponent={Header}
        ListFooterComponent={Footer}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}