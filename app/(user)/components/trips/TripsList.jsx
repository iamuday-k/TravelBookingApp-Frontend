import { FlatList, View, Text } from 'react-native';
import TripCard from './TripsCard';
import Loader from '../common/Loader';

const TripsList = ({ trips, loading, onItemPress, onShare, onWishlist }) => {
  return (
    <FlatList
      data={trips}
      renderItem={({ item }) => (
        <TripCard 
          trip={item} 
          onPress={onItemPress}
          onShare={onShare}
          onWishlist={onWishlist}
        />
      )}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
      ListFooterComponent={loading ? <Loader /> : null}
      ListEmptyComponent={!loading ? (
        <View className="items-center py-20">
          <Text className="text-gray-400 text-base">No trips found</Text>
        </View>
      ) : null}
    />
  );
};

export default TripsList;