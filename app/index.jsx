import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function App() {
  return (
     <View className="flex-1 items-center justify-center bg-white ">
      <Text className="text-xl font-pblack">
        Welcome to Nativewind!
      </Text>
      <StatusBar style="auto" />
      <Link href="/home" className="mt-4 text-lg text-green-500">
        Go to Home
      </Link>
      
    </View>
  );
}


