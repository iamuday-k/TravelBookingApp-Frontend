// hooks/useAgencyPackages.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgencyPackages } from "../store/slices/agencyPackagesSlice";

export const useAgencyPackages = (params = {}) => {
  const dispatch = useDispatch();
  const { items, loading, error, pagination } = useSelector((s) => s.agencyPackages);

  useEffect(() => {
    dispatch(fetchAgencyPackages(params));
  }, [dispatch, params?.status, params?.sort, params?.page]);

  return { items, loading, error, pagination };
};
