// components/agency/LogoutModal.jsx
import React from 'react';
import { View, Text, Modal, TouchableOpacity, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';

const LogoutModal = ({ visible, onClose, onConfirm }) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/60 items-center justify-center px-6">
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
          }}
          className="bg-[#0A1828] rounded-2xl p-6 w-full max-w-sm"
        >
          {/* Icon */}
          <View className="items-center mb-4">
            <View className="bg-red-500/20 rounded-full p-4">
              <Feather name="log-out" size={32} color="#EF4444" />
            </View>
          </View>

          {/* Title */}
          <Text className="text-white text-xl font-pblack text-center mb-2">
            Confirm Logout
          </Text>

          {/* Message */}
          <Text className="text-gray-400 text-center mb-6 font-pregular">
            Are you sure you want to log out of your agency account?
          </Text>

          {/* Buttons */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-gray-700 rounded-xl py-3"
              activeOpacity={0.8}
            >
              <Text className="text-white text-center font-psemibold">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 bg-red-500 rounded-xl py-3"
              activeOpacity={0.8}
            >
              <Text className="text-white text-center font-psemibold">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default LogoutModal;