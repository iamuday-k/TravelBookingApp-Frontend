import SignIn from "../(auth)/sign-in";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { fetchHomeData } from "../../store/slices/homeSlice";

export default function UserSignin() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (formValues) => {
    try {
      await dispatch(fetchHomeData(formValues)).unwrap();
      router.replace("/(user)/(tabs)/home"); // absolute path
    } catch (error) {
      console.error("Failed to fetch home data:", error);
    }
  };

  return <SignIn onSubmit={handleSubmit} role="user" />;
}
