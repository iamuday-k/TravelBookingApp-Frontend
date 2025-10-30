import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Dimensions, FlatList, Image, StatusBar } from 'react-native';
import { images, icons } from '../constants';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextShadow from './components/textshadow';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    image: images.onboard1,
    title: 'Tired of fake travel agents?',
    subtitle: 'We verify all agencies for your safety.',
    quote: '"Explore the world.\n  Share the vibe.\n  Go Vyral."',
    buttonText: 'Get Started'
  },
  {
    id: '2',
    image: images.onboard2,
    title: 'Compare',
    subtitle: '1000+ Packages in One Place.',
    quote: '✓ Elite, Premium, and Verified options.',
    buttonText: 'Next'
  },
  {
    id: '3',
    image: images.onboard3,
    title: 'Share Your Journey and Go Vyral',
    subtitle: '',
    quote: 'Plan your trip or book ready-made packages',
    buttonText: "Next"
  },
  {
    id: '4',
    image: images.welcome, // Using the welcome background image
    title: 'Welcome',
    subtitle: 'New trip. New trend.\nGo Vyral starts here...',
    quote: '',
    buttonText: 'Continue',
    isWelcomePage: true
  }
];

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex === onboardingData.length - 1) {
      // If on the last page (Welcome), navigate to sign-in
      router.push('/(auth)/sign-in');
    } else {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true
      });
      setCurrentIndex(nextIndex);
    }
  };

  const RenderItem = ({ item, index }) => {
    if (item.isWelcomePage) {
      // Render the Welcome page as the 4th item
      return (
        <View style={{ width }}>
          <View style={{ flex: 1 }}>
            <ImageBackground
              source={item.image}
              className="flex-1"
              resizeMode="cover"
            >
              {/* Content Container */}
              <View className="flex-1 justify-between px-6 pt-20 pb-8">                
                {/* Top Section - Title and Subtitle */}
                <View className="items-center mt-8">
                  <Text className="text-yellow-400 font-pbold text-5xl mb-4">
                    {item.title}
                  </Text>
                  <Text className="text-white font-pregular text-base text-center">
                    New trip. New trend.
                  </Text>
                  
                  <Text className="text-white font-pregular text-base text-center">
                    Go Vyral starts here...
                  </Text>
                </View>
                
                {/* Bottom Section - Buttons */}
                <View className="space-y-3 mb-4">
                  {/* Traveller Button - Dark with icon */}
                  
                  <TouchableOpacity
                    className="bg-[#1a2332] rounded-full py-5 px-6 flex-row items-center justify-center relative"
                    activeOpacity={0.8}
                    onPress={() => router.push('/(auth)/sign-in')}
                  >
                    <Text className="text-white font-psemibold text-lg">
                      I'm a Traveller
                    </Text>
                  </TouchableOpacity>
                  
                  {/* Agency Partner Button - White/Light with icon */}
                  <TouchableOpacity
                    className="bg-white rounded-full py-5 px-6 flex-row items-center justify-center relative mar my-6"
                    activeOpacity={0.8}
                    onPress={() => router.push('/(auth)/sign-in')}
                  >
                       
                    <Text className="text-black font-psemibold text-lg">
                      I'm an Agency Partner
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      );
    }

    // Render regular onboarding pages
    return (
      <View style={{ width }}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={item.image}
            className="flex-1"
            resizeMode="cover"
          >
            <View className="flex-1 justify-between pt-20 pb-6 px-6 color-overlay">
              {/* Top Content */}
              <View style={{ marginTop: 40 }}>
                <TextShadow className="text-white font-pextrabold text-4xl leading-normal text-center">{item.title}</TextShadow>
                <Text className="text-white font-pregular text-lg text-center my-5">
                  {item.subtitle}
                </Text>
                <Text
                  className="text-white font-pbold text-3xl text-center leading-10"
                  style={{
                    textShadowColor: 'rgba(0,0,0,0.)',
                    textShadowOffset: { width: 0, height: 2 },
                    textShadowRadius: 6,
                  }}
                >
                  {item.quote}
                </Text>
              </View>

              {/* Spacer for fixed button */}
              <View className="h-20" />
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  };

  const Dot = ({ index }) => {
    return (
      <View
        style={[
          {
            height: 8,
            borderRadius: 4,
            backgroundColor: 'white',
            marginHorizontal: 4,
            width: index === currentIndex ? 40 : 8,
            opacity: index === currentIndex ? 1 : 0.3
          }
        ]}
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Swipeable Image Area */}
      <View className="flex-1">
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(newIndex);
          }}
        />
      </View>

      {/* Floating Button Section - Hide on Welcome page */}
      {!onboardingData[currentIndex].isWelcomePage && (
        <View className="absolute bottom-6 left-6 right-6">
          {/* Dots Indicator */}
          <View className="flex-row justify-center mb-4">
            {onboardingData.map((_, dotIndex) => (
              <Dot key={dotIndex} index={dotIndex} />
            ))}
          </View>

          {/* Floating Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-white rounded-full py-4 flex-row items-center justify-center relative"
            onPress={handleNext}
          >
            <Text className="text-black font-psemibold text-lg">
              {onboardingData[currentIndex].buttonText}
            </Text>
            
            <View className="absolute left-4 bg-black rounded-full w-8 h-8 items-center justify-center">
              <Image 
                source={icons.right_arrow}
                className="w-4 h-4"
                style={{ tintColor: '#FFFFFF' }}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}