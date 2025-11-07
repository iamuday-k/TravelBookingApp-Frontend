import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackages, fetchPackageById } from '../store/slices/packageSlice';

export const usePackages = (params = {}) => {
  const dispatch = useDispatch();
  const {
    allPackages,
    popularPackages,
    domesticPackages,
    internationalPackages,
    loading,
    error,
    pagination
  } = useSelector(state => state.packages);

  useEffect(() => {
    console.log('🎣 usePackages hook - fetching with params:', params);
    dispatch(fetchPackages(params));
  }, [dispatch, JSON.stringify(params)]);

  return {
    allPackages,
    popularPackages,
    domesticPackages,
    internationalPackages,
    loading,
    error,
    pagination
  };
};

export const usePackageById = (packageId) => {
  const dispatch = useDispatch();
  const { currentPackage, loading, error } = useSelector(state => state.packages);

  useEffect(() => {
    if (packageId) {
      console.log('🎣 usePackageById hook - fetching:', packageId);
      dispatch(fetchPackageById(packageId));
    }
  }, [packageId, dispatch]);

  return { package: currentPackage, loading, error };
};