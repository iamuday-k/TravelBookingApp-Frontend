// components/agency/SidebarMenu.jsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { images, icons } from '../../../../constants';
import LogoutModal from './LogoutModal';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.6;

const SidebarMenu = ({ visible, onClose }) => {
  const slideAnim = React.useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -SIDEBAR_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const menuItems = [
    { icon: 'grid', label: 'Dashboard', route: '/(agency)/(tabs)/dashboard' },
    { icon: 'file-text', label: 'My Packages', route: '/(agency)/(tabs)/packages' },
    { icon: 'book-open', label: 'Bookings', route: '/(agency)/bookings/bookings' },
    { icon: 'message-square', label: 'Messages', route: '/(agency)/(tabs)/message' },
    { icon: 'star', label: 'Earnings', route: '/(agency)/(tabs)/earnings' },
    { icon: 'user', label: 'Profile', route: '/(agency)/(tabs)/profile' },
    { icon: 'repeat', label: 'Switch to User', route: '/(user)/(tabs)/home' },
  ];

  const handleNavigation = (route, label) => {
    console.log(`Navigating to: ${label} (${route})`);
    onClose();
    
    if (route === '/(user)/(tabs)/home') {
      router.replace(route);
      return;
    }
    
    router.push(route);
  };

  const handleLogoutClick = () => {
    console.log('Logout button clicked - showing confirmation modal');
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    console.log('Logout confirmed - User logging out');
    setShowLogoutModal(false);
    onClose();
    // Add your actual logout logic here
    // router.replace('/login');
  };

  const handleLogoutCancel = () => {
    console.log('Logout cancelled - User staying logged in');
    setShowLogoutModal(false);
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={onClose}
      >
        {/* Backdrop */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          className="flex-1 bg-black/50"
        >
          {/* Sidebar */}
          <Animated.View
            style={{
              transform: [{ translateX: slideAnim }],
              width: SIDEBAR_WIDTH,
            }}
            className="absolute left-0 top-0 bottom-0 bg-[#0c1e2e] shadow-2xl"
          >
            <TouchableOpacity activeOpacity={1} className="flex-1">
              {/* Header */}
              <View className="px-6 pt-16 pb-8 items-center">
                <Image 
                  source={images.logo} 
                  className="w-28 h-24"
                  resizeMode="contain"
                />
              </View>

              {/* Menu Items */}
              <View className="flex-1 py-2">
                {menuItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleNavigation(item.route, item.label)}
                    className="flex-row items-center px-6 py-5 active:bg-gray-700/30"
                    activeOpacity={0.7}
                  >
                    <Feather name={item.icon} size={24} color="white" />
                    <Text className="text-white text-base font-pregular ml-5">
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}

                {/* Logout */}
                <View className="mt-2">
                  <TouchableOpacity
                    onPress={handleLogoutClick}
                    className="flex-row items-center px-6 py-5 active:bg-red-500/10"
                    activeOpacity={0.7}
                  >
                    <Feather name="power" size={24} color="white" />
                    <Text className="text-white text-base font-pregular ml-5">
                      Log Out
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Footer */}
              <View className="px-6 py-6">
                <Text className="text-gray-500 text-xs text-center font-pregular">
                  App version 10.5.0
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
      
      <LogoutModal
        visible={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default SidebarMenu;