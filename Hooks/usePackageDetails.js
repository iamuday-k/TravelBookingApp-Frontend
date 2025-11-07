import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackageDetails, setFilter, clearFilters } from '../store/slices/packageDetailsSlice';

export const usePackageDetails = (packageId) => {
  const dispatch = useDispatch();
  const { details, selectedFilters, loading, error } = useSelector(
    state => state.packageDetails
  );

  useEffect(() => {
    if (packageId) {
      console.log('🎣 usePackageDetails hook - fetching:', packageId);
      dispatch(fetchPackageDetails(packageId));
    }
  }, [packageId, dispatch]);

  const updateFilter = (filterType, value) => {
    console.log(`🎛️ Updating filter: ${filterType} = ${value}`);
    dispatch(setFilter({ filterType, value }));
  };

  const resetFilters = () => {
    console.log('🔄 Resetting all filters');
    dispatch(clearFilters());
  };

  return {
    details,
    selectedFilters,
    loading,
    error,
    updateFilter,
    resetFilters
  };
};