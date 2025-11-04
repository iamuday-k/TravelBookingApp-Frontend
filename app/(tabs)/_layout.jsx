import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { icons } from '../../constants';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FAD47B', 
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
        name="home"
        options={{
          title: 'Home',
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
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ focused, color }) => (
            <Image 
              source={icons.wishlist}
              className={`w-6 h-6 ${focused ? 'shadow-lg shadow-Gold' : ''}`}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ focused, color }) => (
            <Image 
              source={icons.rewards}
              className={`w-6 h-6 ${focused ? 'shadow-lg shadow-Gold' : ''}`}
              style={{ tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: 'Trips',
          tabBarIcon: ({ focused, color }) => (
            <Image 
              source={icons.trips}
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