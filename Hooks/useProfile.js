import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, toggleNotification } from '../store/slices/profileSlice';

export const useProfile = () => {
  const dispatch = useDispatch();
  const { data, loading, error, updating } = useSelector(s => s.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleToggleNotification = () => {
    dispatch(toggleNotification());
  };

  return { 
    profile: data, 
    loading, 
    error, 
    updating,
    handleToggleNotification
  };
};