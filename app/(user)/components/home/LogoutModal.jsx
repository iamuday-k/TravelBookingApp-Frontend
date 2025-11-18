// components/home/LogoutModal.jsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';

const LogoutModal = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        {/* Modal Content */}
        <View className="bg-white rounded-3xl p-6 w-full max-w-sm">
          {/* Header */}
          <Text className="text-gray-900 text-2xl font-bold text-center mb-3">
            LOG OUT
          </Text>
          
          <Text className="text-gray-600 text-center text-base mb-4">
            Are you sure you want to log out?
          </Text>

          {/* Illustration */}
          <View className="items-center justify-center my-6">
            <View className="relative">
              {/* Plane Icon */}
              <View className="absolute left-0 top-4">
                <Text className="text-6xl">✈️</Text>
              </View>
              
              {/* Globe */}
              <View className="ml-16">
                <Text className="text-7xl">🌍</Text>
              </View>
              
              {/* Compass */}
              <View className="absolute right-0 top-2">
                <Text className="text-8xl">🧭</Text>
              </View>
            </View>
          </View>

          {/* Warning Message */}
          <View className="bg-blue-50 rounded-2xl p-4 mb-6">
            <Text className="text-gray-700 text-center font-medium text-sm leading-5">
              Logging out means losing your compass{'\n'}
              Stay to keep travelling!
            </Text>
          </View>

          {/* Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-blue-400 py-4 rounded-xl active:bg-blue-500"
              activeOpacity={0.8}
            >
              <Text className="text-white text-center font-bold text-base">
                Stay Logged In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 bg-blue-500 py-4 rounded-xl active:bg-blue-600"
              activeOpacity={0.8}
            >
              <Text className="text-white text-center font-bold text-base">
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;