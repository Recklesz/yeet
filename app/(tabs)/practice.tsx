import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, Pressable, View } from 'react-native';

import { SafeAreaScreen } from '@/components/common/SafeAreaScreen';
import { PracticeControls } from '@/components/practice/PracticeControls';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { COFFEE_SHOP_SCENARIO, PRACTICE_COPY } from '@/constants/practice';
import { usePracticeSession } from '@/hooks/usePracticeSession';
import { HStack, Text, VStack } from '@gluestack-ui/themed';

export default function PracticeSessionScreen() {
  const router = useRouter();
  const { status, isMuted, error, start, stop, toggleMute, isConfigured } = usePracticeSession();
  const [progress, setProgress] = useState(0);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  const scenario = COFFEE_SHOP_SCENARIO;

  // Cycle through hints every 10 seconds when connected
  useEffect(() => {
    if (status !== 'connected') return;

    const interval = setInterval(() => {
      setCurrentHintIndex(prev => (prev + 1) % scenario.hints.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [status, scenario.hints.length]);

  // Stub progress bar animation (can be replaced with real timing later)
  useEffect(() => {
    if (status !== 'connected') {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  const handleStart = async () => {
    if (!isConfigured) {
      Alert.alert('Configuration Error', PRACTICE_COPY.errors.configError);
      return;
    }

    await start();

    if (error) {
      Alert.alert('Connection Failed', error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleClose = () => {
    router.back();
  };

  // Idle State Layout
  if (status === 'idle') {
    return (
      <SafeAreaScreen className="bg-gray-200 flex-1">
        <StatusBar style="dark" />
        <View className="flex-1 justify-center items-center px-6">
          {/* Back and Close controls */}
          <View className="absolute top-12 left-6 right-6 flex-row justify-between z-10">
            <Pressable
              onPress={handleBack}
              className="w-10 h-10 rounded-full bg-white/80 items-center justify-center"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <IconSymbol name="chevron.left" size={20} color="#000" />
            </Pressable>
            <Pressable
              onPress={handleClose}
              className="w-10 h-10 rounded-full bg-white/80 items-center justify-center"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <IconSymbol name="xmark" size={20} color="#000" />
            </Pressable>
          </View>

          {/* Main centered card */}
          <View
            className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl px-6 py-8 w-full max-w-sm"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              backgroundColor: '#9333ea',
            }}
          >
            {/* Circular illustration placeholder */}
            <View className="items-center mb-6">
              <View
                className="w-32 h-32 rounded-full bg-white/20 items-center justify-center"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                }}
              >
                <IconSymbol name="person.2.fill" size={64} color="white" />
              </View>
            </View>

            {/* Title and subtitle */}
            <VStack gap={8} alignItems="center" marginBottom={16}>
              <Text fontSize={24} fontWeight="$bold" color="$white" textAlign="center">
                {scenario.title}
              </Text>
              <Text fontSize={16} color="$white" opacity={0.9} textAlign="center">
                {scenario.subtitle}
              </Text>
            </VStack>

            {/* Goal card */}
            <View className="bg-white/20 rounded-2xl p-4 mb-6">
              <HStack gap={12} alignItems="flex-start">
                <View className="w-10 h-10 rounded-full bg-white/30 items-center justify-center">
                  <IconSymbol name="target" size={20} color="white" />
                </View>
                <View className="flex-1">
                  <Text fontSize={12} color="$white" opacity={0.8} marginBottom={4}>
                    YOUR GOAL
                  </Text>
                  <Text fontSize={14} color="$white" fontWeight="$medium">
                    {scenario.goal.description}
                  </Text>
                </View>
              </HStack>
            </View>

            {/* Begin Practice button */}
            <Pressable
              onPress={handleStart}
              className="bg-white rounded-full py-4 px-8 items-center"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <Text fontSize={16} fontWeight="$semibold" color="#9333ea">
                Begin Practice
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaScreen>
    );
  }

  // Active Call State Layout (connecting or connected)
  return (
    <ImageBackground source={scenario.avatarImage} className="flex-1" resizeMode="cover">
      <StatusBar style="light" />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
        locations={[0.4, 0.7, 1]}
        className="flex-1 justify-end"
      >
        {/* Progress bar and hint section */}
        <View className="px-6 pb-24">
          {/* Progress bar */}
          <View className="h-1 bg-gray-300/30 rounded-full overflow-hidden mb-3">
            <View className="h-full bg-blue-400" style={{ width: `${progress}%` }} />
          </View>

          {/* Hint text */}
          {status === 'connected' && (
            <Text fontSize={12} color="$gray300" textAlign="center" marginBottom={16}>
              {scenario.hints[currentHintIndex]}
            </Text>
          )}

          {/* Control cluster */}
          <PracticeControls
            status={status}
            isMuted={isMuted}
            onStart={handleStart}
            onEnd={stop}
            onToggleMute={toggleMute}
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
