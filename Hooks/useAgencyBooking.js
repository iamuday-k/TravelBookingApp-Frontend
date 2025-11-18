import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchBookings, 
  setSearchQuery, 
  setDateFilter, 
  setPackageFilter, 
  setStatusFilter,
  clearFilters 
} from '../store/slices/agencyBookingSlice';

export const useAgencyBookings = () => {
  const dispatch = useDispatch();
  const { 
    stats, 
    bookings, 
    filteredBookings, 
    status, 
    error, 
    searchQuery,
    filters 
  } = useSelector((state) => state.agencyBookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
  };

  const handleDateFilter = (dateRange) => {
    dispatch(setDateFilter(dateRange));
  };

  const handlePackageFilter = (packageName) => {
    dispatch(setPackageFilter(packageName));
  };

  const handleStatusFilter = (status) => {
    dispatch(setStatusFilter(status));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return {
    stats,
    bookings: filteredBookings,
    status,
    error,
    searchQuery,
    filters,
    handleSearch,
    handleDateFilter,
    handlePackageFilter,
    handleStatusFilter,
    handleClearFilters,
  };
};