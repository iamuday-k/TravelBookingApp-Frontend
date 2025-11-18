// app/(agency)/(tabs)/packages.jsx
import React, { useMemo, useState } from "react";
import {  FlatList, ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PackagesTopBar from "../components/packages/PackagesTopBar";
import FilterChips from "../components/packages/FilterChips";
import PackageCard from "../components/packages/PackageCard";
import { useAgencyPackages } from "../../../hooks/useAgencyPackages";
import { useDispatch } from "react-redux";
import { deleteAgencyPackage } from "../../../store/slices/agencyPackagesSlice";

export default function AgencyPackagesPage() {
  const [filters, setFilters] = useState({ status: undefined, sort: "recent", page: 1 });
  const dispatch = useDispatch();
  const { items, loading, error, pagination } = useAgencyPackages(filters);

  const onChange = (partial) => setFilters((f) => ({ ...f, ...partial }));

  const header = useMemo(() => (
    <>
      <PackagesTopBar />
      <FilterChips status={filters.status} onChange={onChange} />
    </>
  ), [filters]);

  if (loading && items.length === 0) {
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

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <FlatList
        data={items}
        keyExtractor={(it) => it.packageId}
        renderItem={({ item }) => (
          <PackageCard
            item={item}
            onDelete={(id) => dispatch(deleteAgencyPackage(id))}
            onEdit={(id) => console.log("Edit", id)}
            onView={(id) => console.log("View", id)}
          />
        )}
        ListHeaderComponent={header}
        ListEmptyComponent={!loading ? (
          <View className="items-center py-20">
            <Text className="text-gray-400">No packages found</Text>
          </View>
        ) : null}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
