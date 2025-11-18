import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const rewardsList = [
  { id: 1, text: "Myntra Coupon ₹200 🎉" },
  { id: 2, text: "Bonus 200 Coins 💰" },
  { id: 3, text: "Better Luck Next Time 😅" },
  { id: 4, text: "Amazon Gift Card ₹500 🎁" },
  { id: 5, text: "Free Trip Upgrade 🧳" },
];

const Rewards = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastReward, setLastReward] = useState(null);
  const [history, setHistory] = useState([]);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const randomReward =
      rewardsList[Math.floor(Math.random() * rewardsList.length)];

    // Smooth spin animation
    Animated.timing(spinValue, {
      toValue: Math.random() * 360 + 1440, // 4 full rotations + random stop
      duration: 3500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
      setLastReward(randomReward);
      setHistory((prev) => [
        { ...randomReward, date: new Date().toLocaleString() },
        ...prev,
      ]);
      console.log("🎯 Reward:", randomReward.text);
      spinValue.setValue(0);
    });
  };

  const rotate = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const renderItem = ({ item }) => (
    <View className="flex-row items-center p-3 bg-gray-800/40 rounded-xl mb-2">
      <View className="bg-gray-700 rounded-full w-9 h-9 justify-center items-center mr-3">
        <Text className="text-lg">🎁</Text>
      </View>
      <View>
        <Text className="text-white font-semibold">{item.text}</Text>
        <Text className="text-gray-400 text-xs">{item.date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0A0F1E] px-5">
      {/* Header */}
      <Text className="text-white text-lg font-bold text-center mt-2">
        Spin Wheel
      </Text>
      <Text className="text-gray-400 text-center text-sm mt-1">
        Each spin costs 1000 coins. You have 10 spins today.
      </Text>

      {/* Wheel Section */}
      <View className="flex items-center mt-6 relative">
        {/* Static Pointer */}
        {/* Wheel Container */}
        <View className="w-60 h-60 rounded-full overflow-hidden justify-center items-center bg-black/40">
          <Animated.Image
            source={require("../../../assets/images/spinner.png")}
            style={{
              width: 230,
              height: 230,
              transform: [{ rotate }],
            }}
            resizeMode="cover"
          />
        </View>

        {/* Spin Button */}
        <TouchableOpacity
          onPress={spinWheel}
          disabled={isSpinning}
          className={`mt-6 px-6 py-3 rounded-full ${
            isSpinning ? "bg-gray-600" : "bg-yellow-400"
          }`}
        >
          <Text className="text-black font-bold text-base">Spin</Text>
        </TouchableOpacity>
      </View>

      {/* Result */}
      {lastReward && (
        <View className="mt-6 items-center">
          <Text className="text-white text-center text-base font-semibold">
            🎉 Congrats! You won {lastReward.text}
          </Text>
        </View>
      )}

      {/* History */}
      <View className="mt-8">
        <Text className="text-white font-bold text-lg mb-2">
          Rewards History
        </Text>
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Rewards;
