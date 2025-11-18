// GoVyral/app/(auth)/agency-sign-up.jsx
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import FormField from './components/FormField';
import useAgencySignUp from '../../hooks/useAgencySignUp';

export default function AgencySignUp() {
  const router = useRouter();
  const [form, setForm] = useState({
    companyName: '',
    aliasName: '',
    email: '',
    phone: '',
    gstin: '',
    officeAddress: '',
    website: '',
    msme: '',
    udyam: '',
    logoUri: null,
  });

  const { submit, status, error } = useAgencySignUp();

  const onChange = (key) => (val) => setForm((s) => ({ ...s, [key]: val }));

  const onSubmit = async () => {
    if (!form.companyName || !form.email) {
      return alert('Please fill required fields');
    }

    const action = await submit(form);

    // Navigate on success (adjust according to your API response)
    if (signUpSucceeded(action)) {
      router.replace('/(auth)/sign-in'); // or wherever you want
    } else {
      // error is already in the slice; you can show additional messages if needed
    }
  };

  // helper to check success — adjust if your API returns different payload
  const signUpSucceeded = (action) => {
    return action?.type === 'agencyAuth/signUpAgency/fulfilled';
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingVertical: 24 }}>
        <View className="px-6">
          <Text className="text-2xl text-white font-bold text-center mb-6">Agency Registration</Text>

          <FormField label="Company Name" value={form.companyName} onChangeText={onChange('companyName')} placeholder="Company name" />
          <FormField label="Company Alias Name (GV_)" value={form.aliasName} onChangeText={onChange('aliasName')} placeholder="GV_..." />
          <FormField label="Email id" value={form.email} onChangeText={onChange('email')} placeholder="email@example.com" keyboardType="email-address" />
          <FormField label="Phone Number" value={form.phone} onChangeText={onChange('phone')} placeholder="+91 1234567890" keyboardType="phone-pad" />
          <FormField label="GSTIN/ Travel License Number" value={form.gstin} onChangeText={onChange('gstin')} placeholder="GSTIN or License" />
          <FormField label="Office Address" value={form.officeAddress} onChangeText={onChange('officeAddress')} placeholder="Office address" multiline />
          <FormField label="Website/Social Links" value={form.website} onChangeText={onChange('website')} placeholder="https://..." />
          <FormField label="MSME Certificate (Optional)" value={form.msme} onChangeText={onChange('msme')} placeholder="MSME number" />
          <FormField label="UDYAM Registration (Optional)" value={form.udyam} onChangeText={onChange('udyam')} placeholder="UDYAM number" />

          <View className="mb-4 px-4">
            <Text className="text-white text-sm mb-2">Upload Brand Logo</Text>
            <TouchableOpacity className="w-20 h-20 rounded-full bg-white/6 items-center justify-center" onPress={() => alert('Open image picker (implement)')}>
              {form.logoUri ? <Image source={{ uri: form.logoUri }} className="w-20 h-20 rounded-full" /> : <Text className="text-white">📷</Text>}
            </TouchableOpacity>
          </View>

          {error ? <Text className="text-red-400 mt-3 px-4">{error}</Text> : null}

          <View className="px-4 mt-6">
            <TouchableOpacity className="bg-blue-500 py-3 rounded-full items-center justify-center" onPress={onSubmit} disabled={status === 'loading'}>
              {status === 'loading' ? <ActivityIndicator /> : <Text className="text-white font-semibold">Register</Text>}
            </TouchableOpacity>

            <View className="flex-row justify-center mt-4">
              <Text className="text-white mr-2">Already have an account?</Text>
              <Link href="/(auth)/sign-in" className="text-blue-400">Sign In</Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
