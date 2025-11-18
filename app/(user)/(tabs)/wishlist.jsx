// app/(tabs)/wishlist.jsx
import { SafeAreaView } from 'react-native-safe-area-context';
import {View, Text } from 'react-native';
import { useWishlist } from '../../../hooks/useWishList';
import WishlistHeader from '../components/wishlist/WishListHeader';
import WishlistFilter from '../components/wishlist/WishListFilter';
import WishlistList from '../components/wishlist/WishListList';

const WishlistPage = () => {
  const {
    sections,
    loading,
    error,
    selectedFilter,
    handleFilterChange,
    handleRemoveItem
  } = useWishlist();

  const handleCardPress = (itemId) => {
    console.log('Wishlist item clicked:', itemId);
    // router.push({ pathname: '/package-details', params: { id: itemId } });
  };

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900">
        <WishlistHeader />
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-red-400 text-center text-lg">{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <WishlistHeader />
      <WishlistFilter
        selectedFilter={selectedFilter}
        onSelectFilter={handleFilterChange}
      />
      <WishlistList
        sections={sections}
        loading={loading}
        onCardPress={handleCardPress}
      />
    </SafeAreaView>
  );
};

export default WishlistPage;