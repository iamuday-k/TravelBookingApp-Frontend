import React from "react";
import {
  ScrollView,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AgencyProfileCard from "../components/agencyprofile/AgencyProfileCard";
import ProfileSettingsRow from "../components/agencyprofile/ProfileSettingsRow";
import ProfileToggleRow from "../components/agencyprofile/ProfileToggleRow";
import useAgencyProfile from "../../../hooks/useAgencyProfile";
import AgencyProfileHeader from "../components/agencyprofile/AgencyProfileHeader";

export default function Profile() {
  const { profileData, status, error } = useAgencyProfile();

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <AgencyProfileHeader title="Profile & Settings" showBack />

      {status === "loading" && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      )}

      {status === "failed" && (
        <View className="p-6">
          <Text className="text-red-400">
            {error || "Failed to load profile"}
          </Text>
        </View>
      )}

      {status === "succeeded" && profileData && (
        <ScrollView className="flex-1">
          <AgencyProfileCard
            profile={profileData}
            onEditPress={() => {
              /* navigate to edit */
            }}
          />

          <View className="mt-4">
            <Text className="px-6 text-white font-bold text-lg">Settings</Text>
            <ProfileSettingsRow label="Booking Notification" value="Enabled" />
            <ProfileSettingsRow label="Payment Notification" value="Enabled" />
            <ProfileSettingsRow label="Password Reset" value="" />
            <ProfileToggleRow
              label="Two Factor authentication"
              enabled={true}
            />

            <View className="px-6 pt-4">
              <Text className="text-blue-400">Terms and Conditions</Text>
              <Text className="text-blue-400 mt-2">Privacy Policy</Text>
            </View>

            <Text className="px-6 text-white font-bold text-lg mt-6">
              Additional Settings
            </Text>
            <ProfileSettingsRow
              label="Time Zone"
              value={profileData.timezone}
            />
            <ProfileSettingsRow label="Language" value={profileData.language} />

            <View className="h-8" />
          </View>
        </ScrollView>
      )}

      {/* if status is idle, the hook will dispatch fetch automatically — optional placeholder */}
    </SafeAreaView>
  );
}
