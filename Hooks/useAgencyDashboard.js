import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgencyDashboard } from "../store/slices/agencyDashboardSlice";

export const useAgencyDashboard = (params) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((s) => s.agencyDashboard);

  useEffect(() => {
    dispatch(fetchAgencyDashboard(params));
  }, [dispatch]);

  return { data, loading, error };
};
