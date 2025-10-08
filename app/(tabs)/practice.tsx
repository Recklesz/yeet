import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { Alert, ScrollView } from 'react-native';

import { YeetButton } from '@/components/common/YeetButton';
import { SafeAreaScreen } from '@/components/common/SafeAreaScreen';
import { PracticeCoachCard } from '@/components/practice/PracticeCoachCard';
import { PracticeControls } from '@/components/practice/PracticeControls';
import { PracticeHeader } from '@/components/practice/PracticeHeader';
import { PracticeTipCard } from '@/components/practice/PracticeTipCard';
import { HOW_IT_WORKS, PRACTICE_COPY, getRandomTip } from '@/constants/practice';
import { usePracticeSession } from '@/hooks/usePracticeSession';
import { Box, Text, VStack } from '@gluestack-ui/themed';

export default function PracticeSessionScreen() {
  const router = useRouter();
  const { status, isMuted, error, start, stop, toggleMute, isConfigured } = usePracticeSession();

  // Get a random tip (memoized so it doesn't change on re-render)
  const tip = useMemo(() => getRandomTip(), []);

  const handleHowItWorks = () => {
    Alert.alert(HOW_IT_WORKS.title, HOW_IT_WORKS.description);
  };

  const handleStart = async () => {
    if (!isConfigured) {
      Alert.alert('Configuration Error', PRACTICE_COPY.errors.configError);
      return;
    }

    await start();

    // Show error if one occurred
    if (error) {
      Alert.alert('Connection Failed', error);
    }
  };

  return (
    <SafeAreaScreen style={{ backgroundColor: '#ffffff' }}>
      <Box flex={1}>
        <StatusBar style="dark" />

        <ScrollView
          contentContainerStyle={{
            paddingTop: 24,
            paddingHorizontal: 24,
            paddingBottom: 56,
          }}
          showsVerticalScrollIndicator={false}
        >
          <VStack gap="$6" alignItems="center">
            {/* Header */}
            <PracticeHeader onHowItWorksPress={handleHowItWorks} />

            {/* Coach Avatar Card */}
            <PracticeCoachCard status={status} />

            {/* Call Controls */}
            <PracticeControls
              status={status}
              isMuted={isMuted}
              onStart={handleStart}
              onEnd={stop}
              onToggleMute={toggleMute}
            />

            {/* Idle State Message */}
            {status === 'idle' && (
              <VStack alignItems="center" gap={12} marginTop={16}>
                <Text fontSize={18} fontWeight="$semibold" color="$black" textAlign="center">
                  {PRACTICE_COPY.idleTitle}
                </Text>
                <Text fontSize={14} color="$gray600" textAlign="center" paddingHorizontal={16}>
                  {PRACTICE_COPY.idleDescription}
                </Text>
              </VStack>
            )}

            {/* Tip Card */}
            <PracticeTipCard tip={tip} />

            {/* Dev Button */}
            <YeetButton
              variant="primary"
              size="md"
              onPress={() => router.push('/review')}
              className="bg-blue-600"
            >
              View Sample Review (Dev)
            </YeetButton>
          </VStack>
        </ScrollView>
      </Box>
    </SafeAreaScreen>
  );
}
