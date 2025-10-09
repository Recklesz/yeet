import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ImageBackground, Pressable, Text as RNText, View } from 'react-native';

import { BrandGradient } from '@/components/common/BrandGradient';
import { SafeAreaScreen } from '@/components/common/SafeAreaScreen';
import { PracticeControls } from '@/components/practice/PracticeControls';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { COFFEE_SHOP_SCENARIO, PRACTICE_COPY } from '@/constants/practice';
import { PRACTICE_MODE } from '@/constants/runtime';
import { COLORS } from '@/constants/ui-tokens';
import { usePracticeSession } from '@/hooks/usePracticeSession';
import { VStack } from '@gluestack-ui/themed';

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
    // Only show config error in live mode
    if (!isConfigured && PRACTICE_MODE === 'live') {
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
      <SafeAreaScreen className="bg-background-0 flex-1" edges={['top', 'left', 'right']}>
        <StatusBar style="dark" />
        <View className="flex-1 justify-center items-center px-6">
          {/* Back and Close controls */}
          <View className="absolute top-12 left-6 right-6 flex-row justify-between z-10">
            <Pressable
              onPress={handleBack}
              className="w-10 h-10 rounded-full bg-typography-0/80 items-center justify-center shadow-sm"
            >
              <IconSymbol name="chevron.left" size={20} color={COLORS.typography[900]} />
            </Pressable>
            <Pressable
              onPress={handleClose}
              className="w-10 h-10 rounded-full bg-typography-0/80 items-center justify-center shadow-sm"
            >
              <IconSymbol name="xmark" size={20} color={COLORS.typography[900]} />
            </Pressable>
          </View>

          {/* Main centered card with brand gradient */}
          <BrandGradient className="rounded-3xl w-full max-w-sm shadow-lg">
            <View className="px-6 py-8">
              {/* Avatar image */}
              <View className="items-center mb-6">
                <View className="w-32 h-32 rounded-full overflow-hidden shadow-md">
                  <Image
                    source={scenario.avatarImage}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              </View>

              {/* Title and subtitle */}
              <VStack gap={8} alignItems="center" marginBottom={16}>
                <RNText className="text-2xl font-bold text-typography-900 text-center">
                  {scenario.title}
                </RNText>
                <RNText className="text-base text-typography-700 text-center">
                  {scenario.subtitle}
                </RNText>
              </VStack>

              {/* Goal card */}
              <View className="bg-white/90 rounded-2xl p-4 mb-6">
                <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                  <View className="w-10 h-10 rounded-full bg-primary-100 items-center justify-center">
                    <IconSymbol name="target" size={20} color={COLORS.primary[500]} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <RNText className="text-xs font-semibold text-typography-600 mb-1">
                      YOUR GOAL
                    </RNText>
                    <RNText className="text-base font-medium text-typography-900">
                      {scenario.goal.description}
                    </RNText>
                  </View>
                </View>
              </View>

              {/* Begin Practice button */}
              <Pressable
                onPress={handleStart}
                className="bg-typography-0 rounded-full py-4 px-8 items-center shadow-soft-1"
              >
                <RNText className="text-base font-semibold text-primary-500">Begin Practice</RNText>
              </Pressable>
            </View>
          </BrandGradient>
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
          <View className="h-1 bg-typography-0/30 rounded-full overflow-hidden mb-3">
            <View className="h-full bg-primary-400" style={{ width: `${progress}%` }} />
          </View>

          {/* Hint text */}
          {status === 'connected' && (
            <RNText className="text-xs text-typography-200 text-center mb-4">
              {scenario.hints[currentHintIndex]}
            </RNText>
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
