// app/(agency)/packages/add.jsx
import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { createAgencyPackage } from "../../../store/slices/agencyPackagesSlice";
import { useRouter } from "expo-router";

import FormField from "../components/packages/FormField";
import CheckboxRow from "../components/packages/CheckBoxRow";
import InclusionExclusion from "../components/packages/InclusionExclusion";
import PrimaryButton from "../components/packages/PrimaryButton";

export default function AddPackagePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = useSelector((s) => s.agencyPackages.loading);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [destinations, setDestinations] = useState("");
  const [duration, setDuration] = useState("");
  const [dates, setDates] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [itinerary, setItinerary] = useState([
    { day: "Day 1", text: "", expanded: false },
    { day: "Day 2", text: "", expanded: false },
  ]);
  const [options, setOptions] = useState({
    flight: false,
    meal: false,
    accomodation: false,
    transfers: false,
  });

  const [inclusions, setInclusions] = useState([]); // array of strings
  const [exclusions, setExclusions] = useState([]); // array of strings

  const [contactNumber, setContactNumber] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");

  const toggleOption = (key) => setOptions((o) => ({ ...o, [key]: !o[key] }));

  const addDay = () =>
    setItinerary((it) => [...it, { day: `Day ${it.length + 1}`, text: "", expanded: true }]);

  const handlePublish = async () => {
    if (!title.trim()) {
      Alert.alert("Validation", "Please enter package title");
      return;
    }

    const payload = {
      name: title,
      description,
      destinations,
      duration,
      dates,
      departureCity,
      startingPrice: Number(price) || 0,
      discount: discount || null,
      options,
      itinerary,
      inclusions,
      exclusions,
      contactNumber,
      whatsapp,
      email,
      status: "pending",
    };

    try {
      const res = await dispatch(createAgencyPackage(payload)).unwrap();
      console.log("Created package:", res);
      router.replace("/(agency)/packages"); // go back to packages list
    } catch (e) {
      Alert.alert("Error", e?.message || String(e) || "Failed to create package");
    }
  };

  const FormHeader = () => (
    <View className="px-4 pt-8" style={{ paddingBottom: 48 }}>
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Text className="text-white font-psemibold">◀ Add Packages</Text>
      </TouchableOpacity>

      <Text className="text-white font-pbold text-lg mb-4">Package Details</Text>
      <FormField placeholder="Package title" value={title} onChangeText={setTitle} />
      <FormField
        placeholder="Description"
        multiline
        value={description}
        onChangeText={setDescription}
        otherStyles="mt-4"
      />

      <Text className="text-white font-pbold text-lg mt-6 mb-3">Travel Information</Text>
      <View className="flex-row justify-between">
        <FormField
          placeholder="Paris, New York"
          value={destinations}
          onChangeText={setDestinations}
          otherStyles="w-1/2 mr-2"
        />
        <FormField
          placeholder="4 Days, 3 Nights"
          value={duration}
          onChangeText={setDuration}
          otherStyles="w-1/2"
        />
      </View>

      <View className="flex-row justify-between mt-3">
        <FormField
          placeholder="11/05/2026 - 25/05/2026"
          value={dates}
          onChangeText={setDates}
          otherStyles="w-1/2 mr-2"
        />
        <FormField
          placeholder="France"
          value={departureCity}
          onChangeText={setDepartureCity}
          otherStyles="w-1/2"
        />
      </View>

      <Text className="text-white font-pbold text-lg mt-6">Pricing & Offers</Text>
      <View className="flex-row justify-between mt-3">
        <FormField
          placeholder="$ 2,000"
          value={price}
          onChangeText={setPrice}
          otherStyles="w-1/2 mr-2"
          keyboardType="numeric"
        />
        <FormField
          placeholder="Optional"
          value={discount}
          onChangeText={setDiscount}
          otherStyles="w-1/2"
        />
      </View>

      <Text className="text-white font-psemibold mt-4">Customizable Options</Text>
      <View className="flex-row flex-wrap mt-2">
        <CheckboxRow
          label="Flight Included"
          checked={options.flight}
          onToggle={() => toggleOption("flight")}
        />
        <CheckboxRow
          label="Meal Included"
          checked={options.meal}
          onToggle={() => toggleOption("meal")}
        />
        <CheckboxRow
          label="Accommodation"
          checked={options.accomodation}
          onToggle={() => toggleOption("accomodation")}
        />
        <CheckboxRow
          label="Flight Transfers"
          checked={options.transfers}
          onToggle={() => toggleOption("transfers")}
        />
      </View>

      <Text className="text-white font-pbold text-lg mt-6">Itinerary</Text>
      <View className="mt-3 px-1">
        {itinerary.map((d, idx) => (
          <View key={idx} className="mb-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-white font-psemibold">{d.day}</Text>
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => {
                    setItinerary((prev) =>
                      prev.map((p, i) => (i === idx ? { ...p, expanded: !p.expanded } : p))
                    );
                  }}
                  className="mr-3 bg-[#0f1724] px-3 py-1 rounded-md"
                >
                  <Text className="text-white font-psemibold">
                    {d.expanded ? "Hide" : "Note"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setItinerary((prev) => prev.filter((_, i) => i !== idx));
                  }}
                  className="bg-red-600 px-3 py-1 rounded-md"
                >
                  <Text className="text-white font-psemibold">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>

            {d.expanded ? (
              <View className="mt-2">
                <Text className="text-gray-300 mb-2">Add details for {d.day}</Text>
                <TextInput
                  value={d.text}
                  onChangeText={(txt) =>
                    setItinerary((prev) => prev.map((p, i) => (i === idx ? { ...p, text: txt } : p)))
                  }
                  placeholder="Write notes for the day..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  className="border border-gray-700 rounded-xl px-4 py-3 text-white"
                />
              </View>
            ) : (
              <Text className="text-gray-400 mt-2">{d.text ? d.text : "No notes yet"}</Text>
            )}
          </View>
        ))}

        {/* Visible, styled Add Day button */}
        <TouchableOpacity
          onPress={addDay}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 14,
            backgroundColor: "#5192FF", // teal-ish so it stands out on dark bg
            alignSelf: "flex-start",
            borderRadius: 8,
            marginTop: 8,
            borderWidth: 1,
            borderColor: "#0891b2",
          }}
          accessibilityLabel="Add day"
        >
          <Text style={{ color: "#ffffff", fontWeight: "700" }}>{"+ Add Day"}</Text>
        </TouchableOpacity>
      </View>

      {/* Inclusion & Exclusion block */}
      <InclusionExclusion
        inclusions={inclusions}
        exclusions={exclusions}
        onChange={({ inclusions: newIncs, exclusions: newExcs }) => {
          setInclusions(newIncs);
          setExclusions(newExcs);
        }}
      />

      <Text className="text-white font-pbold text-lg mt-6">Agency Contact & Support</Text>
      <View className="flex-row justify-between mt-3">
        <View className="w-1/2 mr-2">
          <FormField
            placeholder="Contact Number"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
          />
        </View>
        <View className="w-1/2">
          <FormField
            placeholder="Whatsapp"
            value={whatsapp}
            onChangeText={setWhatsapp}
            keyboardType="phone-pad"
          />
        </View>
      </View>
      <View className="px-0 mt-3">
        <FormField
          title="Email id"
          placeholder="gvagencyname@gmail.com"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={{ marginTop: 18, marginBottom: 36 }}>
        <PrimaryButton title="Publish" onPress={handlePublish} loading={loading} />
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <FlatList
        data={[]}
        keyExtractor={() => "form"}
        ListHeaderComponent={FormHeader}
        contentContainerStyle={{ paddingBottom: 48 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
