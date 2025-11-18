import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { icons } from '../../../constants';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#5192FF', 
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: '#081828',
          borderTopWidth: 0,
          height: 80,
          paddingTop: 8,
          paddingBottom: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Poppins-Medium', 
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused, color }) => (
            <Image 
              source={icons.home}
              className={`w-6 h-6 ${focused ? 'shadow-lg shadow-Gold' : ''}`}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="packages"
        options={{
          title: 'Packages',
          tabBarIcon: ({ focused, color }) => (
            <Image 
              source={icons.packages}
              className={`w-6 h-6 ${focused ? 'shadow-lg shadow-Gold' : ''}`}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: 'Message',
          tabBarIcon: ({ focused, color }) => (
            <Image 
              source={icons.message}
              className={`w-6 h-6 ${focused ? 'shadow-lg shadow-Gold' : ''}`}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: 'Earnings',
          tabBarIcon: ({ focused, color }) => (
            <Image 
              source={icons.earnings}
              className={`w-6 h-6 ${focused ? 'shadow-lg shadow-Gold' : ''}`}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <Image 
              source={icons.profile}
              className={`w-6 h-6 ${focused ? 'shadow-lg shadow-Gold' : ''}`}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
    </Tabs>
  );
}