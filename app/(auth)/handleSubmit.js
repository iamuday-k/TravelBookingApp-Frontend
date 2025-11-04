import { useDispatch } from "react-redux";
import { fetchHomeData } from "../../store/slices/homeSlice";
import { useRouter } from "expo-router"; // or next/router depending on your setup

export const useSubmitHandler = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      // 1️ Start data fetching before navigation
      const result = await dispatch(fetchHomeData()).unwrap();

      // 2️ Once data is fetched, navigate to home
      router.replace("../home");
    } catch (error) {
      console.error("Failed to fetch home data:", error);
      // optionally show a toast or alert
    }
  };

  return { handleSubmit };
};
