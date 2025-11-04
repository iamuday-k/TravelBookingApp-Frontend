// hooks/useWishlist.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, setFilter, removeFromWishlist } from '../store/slices/wishListSlice';
import { FILTER_TO_TIER } from '../constants/wishlistConfig';

export const useWishlist = () => {
  const dispatch = useDispatch();
  const { sections, loading, error, selectedFilter } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  // Only filter sections if data is loaded
  const filteredSections = loading ? [] : sections
    .map(section => ({
      ...section,
      items: section.items.filter(item => {
        // Safe check for item details
        if (!item?.details) return false;
        
        if (selectedFilter === 'All') return true;
        const tierValue = FILTER_TO_TIER[selectedFilter];
        return item.details.tier === tierValue;
      })
    }))
    .filter(section => section.items.length > 0);

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  const handleRemoveItem = (itemId) => {
    console.log('Removing item from wishlist:', itemId);
    dispatch(removeFromWishlist(itemId));
  };

  return {
    sections: filteredSections,
    loading,
    error,
    selectedFilter,
    handleFilterChange,
    handleRemoveItem
  };
};