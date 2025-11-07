// hooks/useSearch.js
import { useDispatch, useSelector } from 'react-redux';
import { searchTrips, setFilters, resetFilters, clearSearch } from '../store/slices/searchSlice';

export const useSearch = () => {
  const dispatch = useDispatch();
  const { 
    trips, 
    relevantAgencies, 
    pagination, 
    loading, 
    error, 
    filters 
  } = useSelector(state => state.search);

  const performSearch = (searchParams) => {
    console.log('useSearch - performSearch called with:', searchParams);
    dispatch(searchTrips(searchParams));
  };

  const updateFilters = (newFilters) => {
    console.log('useSearch - updateFilters called with:', newFilters);
    dispatch(setFilters(newFilters));
  };

  const resetSearchFilters = () => {
    console.log('useSearch - resetSearchFilters called');
    dispatch(resetFilters());
  };

  const clearSearchResults = () => {
    console.log('useSearch - clearSearchResults called');
    dispatch(clearSearch());
  };

  return {
    trips,
    relevantAgencies,
    pagination,
    loading,
    error,
    filters,
    performSearch,
    updateFilters,
    resetSearchFilters,
    clearSearchResults
  };
};