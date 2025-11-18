// hooks/useAgencySubmitHandler.js
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { fetchAgencyDashboard } from "../store/slices/agencyDashboardSlice";

export const useAgencySubmitHandler = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await dispatch(fetchAgencyDashboard()).unwrap();
      console.log("Agency dashboard data loaded:", res);
      router.replace("/(agency)/(tabs)/dashboard");
    } catch (error) {
      console.error("Failed to fetch agency dashboard:", error);
    }
  };

  return { handleSubmit };
};
