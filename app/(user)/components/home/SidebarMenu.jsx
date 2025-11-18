// components/home/SidebarMenu.jsx
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
import { images,icons } from '../../../../constants';
import LogoutModal from './LogoutModal';


const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.5;

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
    
    { icon: icons.trips , label: 'Bookings', route: '/trips' },
    { icon: icons.share , label: 'Messages', route: '/messages' },
    { icon: icons.rewards, label: 'Rewards', route: '/rewards' },
    { icon: icons.wishlist, label: 'Wishlist', route: '/wishlist' },
    { icon: icons.profile , label: 'Profile', route: '/profile' },
  ];

  const handleNavigation = (route, label) => {
    console.log(`Navigating to: ${label} (${route})`);
    onClose();
    
    if (route === '/home') {
      // Already on home, just close menu
      return;
    }
    
    // Navigate to other routes
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
    // Example: dispatch(logout()), router.replace('/login'), etc.
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
          className="absolute left-0 top-0 bottom-0 bg-[#0A1828] shadow-2xl"
        >
          <TouchableOpacity activeOpacity={1} className="flex-1 m-10">
            {/* Header */}
              <View className="flex-row items-center justify-center">
                <View className="ml-4">
                  <Image source={images.logo}/>
                </View>
              </View>
            {/* Menu Items */}
            <View className="flex-1 py-4 items-center">
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleNavigation(item.route, item.label)}
                  className="flex-row items-center px-7 py-6 active:bg-gray-700/50"
                  activeOpacity={0.7}
                >
                  {item.iconComponent ? (
                    item.iconComponent
                  ) : (
                    <Image source={item.icon} style={{ width: 22, height: 22, tintColor: 'white' }} />
                  )}
                  <Text className="text-white text-base font-medium ml-4">
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}

           
           

              {/* Logout */}
              <TouchableOpacity
                onPress={handleLogoutClick}
                className="flex-row items-center px-6 py-4 active:bg-red-500/10"
                activeOpacity={0.7}
              >
                <Feather name="log-out" size={22} color="#EF4444" />
                <Text className="text-red-400 text-base font-medium ml-4">
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View className="px-6 py-6 border-t border-gray-700">
              <Text className="text-gray-500 text-xs text-center">
                GoVyral v1.0.0
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