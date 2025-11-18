import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../store/slices/agencyProfileSlice";

export default function useAgencyProfile() {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.agencyProfile?.profileData);
  const status = useSelector((state) => state.agencyProfile?.status);
  const error = useSelector((state) => state.agencyProfile?.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProfile());
    }
  }, [dispatch, status]);

  return { profileData, status, error };
}
