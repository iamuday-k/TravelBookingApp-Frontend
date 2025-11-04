import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips, setActiveTab } from '../store/slices/tripsSlice';

export const useTrips = () => {
  const dispatch = useDispatch();
  const { 
    items, 
    upcomingTrips, 
    completedTrips, 
    loading, 
    error, 
    activeTab 
  } = useSelector(s => s.trips);

  useEffect(() => {
    dispatch(fetchTrips('all'));
  }, [dispatch]);

  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
  };

  const getCurrentTrips = () => {
    return activeTab === 'upcoming' ? upcomingTrips : completedTrips;
  };

  return { 
    trips: getCurrentTrips(),
    allTrips: items,
    upcomingTrips,
    completedTrips,
    loading, 
    error,
    activeTab,
    handleTabChange
  };
};