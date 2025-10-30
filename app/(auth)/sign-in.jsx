import { View, Text, ImageBackground } from "react-native";
import {Link, useRouter} from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FloatingBox from "../components/floating-box";
import CustomButton from "../components/CustomButton";
import { Button } from "react-native-web";
import FormField from "../components/FormField";
import { useSubmitHandler } from "./handleSubmit";



 const SignIn = () => {
   const [form, setForm] = useState({email:"", password:""})
   const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

//   const submit= () =>{
//     router.replace("../home")
//   }
  const { handleSubmit } = useSubmitHandler();

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={images.login}
        resizeMode="cover"
        className="flex-1"
      >
        {/* overlay fills entire screen */}
        <View className="justify-center items-center px-6 flex-1">
          {/* floating white box */}
         <FloatingBox classname="" height={600} width={350} radius={50}>
          <View className="px-6 py-8 items-center">
            <Text className="font-pblack text-center text-4xl pb-10">Hello {'\n'} Traveller!</Text>

            <FormField
              title="Email"
              value = {form.email}
              handleChangeText = {(e)=>setForm({...form, email:e})}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
           
            <FormField
              title="Password"
              value = {form.password}
              handleChangeText = {(e)=>setForm({...form, password:e})}
              otherStyles="mt-7"
            />
            <CustomButton title='Login' handlePress={handleSubmit} containerStyles="mt-20" isLoading={isSubmitting}/>
            <CustomButton title='Login With Google'  handlePress={handleSubmit} containerStyles="mt-5" isLoading={isSubmitting} />

            <View className="justify-center pt-2 flex-row gap-2">
              <Text className="text-primary font-pregular ">Don't have an account?</Text>
              <Link href="/sign-up" className="text-Gold font-pbold">Sign Up</Link>

            </View>

          </View>
         </FloatingBox>
         </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;
