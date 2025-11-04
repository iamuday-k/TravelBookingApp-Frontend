// hooks/useAgencies.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAgencies, 
  setSelectedLocation, 
  toggleWishlist,
  setCurrentTier,
  clearAgencies
} from '../store/slices/agencySlice';

export const useAgencies = (tier) => {
  const dispatch = useDispatch();
  
  const {
    agencies,
    filteredAgencies,
    selectedLocation,
    wishlist,
    loading,
    error,
    pagination,
    currentTier,
  } = useSelector((state) => state.agency);

  useEffect(() => {
    if (tier && tier !== currentTier) {
      dispatch(clearAgencies());
      dispatch(setCurrentTier(tier));
      dispatch(fetchAgencies({ tier, page: 1, limit: 10 }));
    }
  }, [tier, currentTier, dispatch]);

  const handleLocationFilter = (location) => {
    console.log('Filter by location:', location);
    dispatch(setSelectedLocation(location));
  };

  const handleToggleWishlist = (agencyId) => {
    console.log('Toggle wishlist for agency:', agencyId);
    dispatch(toggleWishlist(agencyId));
  };

  const isInWishlist = (agencyId) => {
    return wishlist.includes(agencyId);
  };

  const loadMore = () => {
    if (!loading && pagination.page * pagination.limit < pagination.total) {
      const nextPage = pagination.page + 1;
      console.log('Loading more agencies, page:', nextPage);
      dispatch(fetchAgencies({ tier, page: nextPage, limit: pagination.limit }));
    }
  };

  return {
    agencies: filteredAgencies,
    selectedLocation,
    loading,
    error,
    pagination,
    handleLocationFilter,
    handleToggleWishlist,
    isInWishlist,
    loadMore,
  };
};