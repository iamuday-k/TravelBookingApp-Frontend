import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeData } from '../store/slices/homeSlice';

export const useHomeData = () => {
  const dispatch = useDispatch();
  
  const {
    loading,
    error,
    trips,
    relevantAgencies = {
      elite: [],
      premium: [],
      verified: [],
      welcomeGift: []
    },
    promotions = [],
    spiritualDestinations = [],
    popularDestinations = [],
    testimonials = [],
    pagination,
  } = useSelector((state) => state.home || {});

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  const refetch = () => {
    dispatch(fetchHomeData());
  };

  return {
    loading,
    error,
    trips: trips || [],
    relevantAgencies,
    promotions,
    spiritualDestinations,
    popularDestinations,
    testimonials,
    pagination,
    refetch,
  };
};