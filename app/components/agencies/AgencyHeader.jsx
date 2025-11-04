// components/agencies/AgencyHeader.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TIER_CONFIG } from '../../../constants/tierConfig';
import { images } from '../../../constants';
import TextShadow from '../textshadow';

const AgencyHeader = ({ tier }) => {
  const config = TIER_CONFIG[tier];

  const handleBack = () => {
    console.log('Back button pressed');
    router.back();
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View className={`${config.header.bg} pt-12 pb-6 px-4`}>
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            onPress={handleBack}
            className="bg-gray-800/50 p-2 rounded-full"
          >
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>

          
        </View>

      <ImageBackground
        source={images.thumbnail}
        resizeMode="cover"
        className="w-full h-80 justify-center items-center"
      >
        <View className="absolute inset-0 bg-black/40" />

          <TextShadow className="text-4xl font-pbold tracking-wide pb-2"style={{ color: config.header.iconColor }} >
          {config.name}
          </TextShadow>
      </ImageBackground>

      </View>
    </>
  );
};

export default AgencyHeader;