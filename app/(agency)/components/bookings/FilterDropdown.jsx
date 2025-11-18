import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FilterDropdown = ({ label, selectedValue, onSelect, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        className="bg-transparent border border-gray-700 rounded-lg px-4 py-2.5 flex-row items-center"
      >
        <Text className="text-white text-sm mr-1">{selectedValue || label}</Text>
        <Ionicons name="chevron-down" size={16} color="white" />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
          className="flex-1 bg-black/50 justify-center items-center"
        >
          <View className="bg-[#1A1B23] rounded-2xl p-4 w-4/5 max-h-96">
            <Text className="text-white text-lg font-semibold mb-4">{label}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item.value)}
                  className="py-3 border-b border-gray-800"
                >
                  <Text className="text-white text-base">{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default FilterDropdown;