// app/(auth)/sign-in.jsx
import { View, Text, ImageBackground } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FloatingBox from "../(user)/components/floating-box";
import CustomButton from "../(user)/components/CustomButton";
import FormField from "../(user)/components/FormField";

const SignIn = ({ onSubmit, role }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (provider) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSubmit?.({ ...form, role, provider }); // calls user/agency handler
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground source={images.login} resizeMode="cover" className="flex-1">
        <View className="justify-center items-center px-6 flex-1">
          <FloatingBox classname="" height={600} width={350} radius={50}>
            <View className="px-6 py-8 items-center">
              <Text className="font-pblack text-center text-4xl pb-10">
                Hello {"\n"} Traveller!
              </Text>

              <FormField
                title="Email"
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyles="mt-7"
                keyboardType="email-address"
              />

              <FormField
                title="Password"
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles="mt-7"
              />

              <CustomButton
                title="Login"
                handlePress={() => submit("password")}
                containerStyles="mt-20"
                isLoading={isSubmitting}
              />

              <CustomButton
                title="Login With Google"
                handlePress={() => submit("google")}
                containerStyles="mt-5"
                isLoading={isSubmitting}
              />

              <View className="justify-center pt-2 flex-row gap-2">
                <Text className="text-primary font-pregular">Don't have an account?</Text>
                <Link href="/(auth)/agency-sign-up" className="text-Gold font-pbold">
                  Sign Up
                </Link>
              </View>
            </View>
          </FloatingBox>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;
