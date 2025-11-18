// components/agency/packages/InclusionExclusion.jsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";

/**
 * Simple UI that lets user add multiple inclusion / exclusion items.
 * It keeps a text input + Add button for each list and shows the items as bullets.
 *
 * Props:
 *  - inclusions: array of strings
 *  - exclusions: array of strings
 *  - onChange: ( { inclusions, exclusions } ) => void
 */
export default function InclusionExclusion({ inclusions = [], exclusions = [], onChange }) {
  const [incInput, setIncInput] = useState("");
  const [excInput, setExcInput] = useState("");

  const addInclusion = () => {
    if (!incInput.trim()) return;
    const next = [...inclusions, incInput.trim()];
    setIncInput("");
    onChange?.({ inclusions: next, exclusions });
  };

  const addExclusion = () => {
    if (!excInput.trim()) return;
    const next = [...exclusions, excInput.trim()];
    setExcInput("");
    onChange?.({ inclusions, exclusions: next });
  };

  const removeInclusion = (idx) => {
    const next = inclusions.filter((_, i) => i !== idx);
    onChange?.({ inclusions: next, exclusions });
  };

  const removeExclusion = (idx) => {
    const next = exclusions.filter((_, i) => i !== idx);
    onChange?.({ inclusions, exclusions: next });
  };

  return (
    <View className="mt-6 px-0">
      <Text className="text-white font-pbold text-lg mb-3">Inclusion & Exclusion</Text>

      <View className="flex-row">
        <View className="flex-1 mr-2">
          <Text className="text-white font-psemibold mb-2">Inclusion</Text>
          <View className="flex-row">
            <TextInput
              value={incInput}
              onChangeText={setIncInput}
              placeholder="Add inclusion (e.g. Hotel Stay)"
              placeholderTextColor="#9CA3AF"
              className="flex-1 border border-gray-700 rounded-xl px-3 py-2 text-white"
            />
            <TouchableOpacity onPress={addInclusion} activeOpacity={0.8} className="ml-2 bg-primary px-4 py-2 rounded-xl items-center justify-center">
              <Text className="text-white font-psemibold">Add</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={inclusions}
            keyExtractor={(_, i) => `inc-${i}`}
            renderItem={({ item, index }) => (
              <View className="flex-row items-center mt-2">
                <Text className="text-white/90 flex-1">• {item}</Text>
                <TouchableOpacity onPress={() => removeInclusion(index)} className="ml-3">
                  <Text className="text-red-400">Remove</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text className="text-gray-400 mt-2">No inclusions added</Text>}
          />
        </View>

        <View className="flex-1 ml-2">
          <Text className="text-white font-psemibold mb-2">Exclusion</Text>
          <View className="flex-row">
            <TextInput
              value={excInput}
              onChangeText={setExcInput}
              placeholder="Add exclusion (e.g. Visa Fees)"
              placeholderTextColor="#9CA3AF"
              className="flex-1 border border-gray-700 rounded-xl px-3 py-2 text-white"
            />
            <TouchableOpacity onPress={addExclusion} activeOpacity={0.8} className="ml-2 bg-primary px-4 py-2 rounded-xl items-center justify-center">
              <Text className="text-white font-psemibold">Add</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={exclusions}
            keyExtractor={(_, i) => `exc-${i}`}
            renderItem={({ item, index }) => (
              <View className="flex-row items-center mt-2">
                <Text className="text-white/90 flex-1">• {item}</Text>
                <TouchableOpacity onPress={() => removeExclusion(index)} className="ml-3">
                  <Text className="text-red-400">Remove</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text className="text-gray-400 mt-2">No exclusions added</Text>}
          />
        </View>
      </View>
    </View>
  );
}
