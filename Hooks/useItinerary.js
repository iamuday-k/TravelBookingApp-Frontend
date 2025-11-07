import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItinerary } from '../store/slices/itinerarySlice';

export const useItinerary = (packageId) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.itinerary);

  useEffect(() => {
    if (packageId) {
      console.log('🎣 useItinerary hook - fetching:', packageId);
      dispatch(fetchItinerary(packageId));
    }
  }, [packageId, dispatch]);

  return { itinerary: data, loading, error };
};