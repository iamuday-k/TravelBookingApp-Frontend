import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEarnings, setFilter } from '../store/slices/agencyEarningsSlice';

export const useAgencyEarnings = () => {
  const dispatch = useDispatch();
  const { stats, transactions, graphData, status, error } = useSelector(
    (state) => state.agencyEarnings
  );

  useEffect(() => {
    dispatch(fetchEarnings());
  }, [dispatch]);

  return {
    stats,
    transactions,
    graphData,
    status,
    error,
  };
};