import SignIn from "../(auth)/sign-in";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { fetchAgencyDashboard } from "../../store/slices/agencyDashboardSlice";

export default function AgencySignin() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (formValues) => {
    try {
      await dispatch(fetchAgencyDashboard(formValues)).unwrap();
      router.replace("/(agency)/(tabs)/dashboard");
    } catch (error) {
      console.error("Failed to fetch agency dashboard:", error);
    }
  };

  return <SignIn onSubmit={handleSubmit} role="agency" />;
}
