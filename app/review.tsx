import {
  Box,
  Button,
  ButtonText,
  Divider,
  Text,
  Toast,
  ToastTitle,
  useToast,
  VStack,
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';

import { FeedbackAccordion } from '@/components/review/FeedbackAccordion';
import { MetricGrid } from '@/components/review/MetricGrid';
import { PromptList } from '@/components/review/PromptList';
import { ReviewHeader } from '@/components/review/ReviewHeader';
import { mockReviewData } from '@/constants/review';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ReviewScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const toast = useToast();
  const hasShownToast = useRef(false);

  // TODO: Replace with actual review data from navigation params or global state
  const reviewData = mockReviewData;

  // Show achievement toast on mount
  useEffect(() => {
    if (!hasShownToast.current) {
      hasShownToast.current = true;

      // Show toast based on performance
      if (reviewData.overallScore >= 8) {
        toast.show({
          placement: 'top',
          render: ({ id }) => {
            return (
              <Toast backgroundColor="$green600" nativeID={id}>
                <ToastTitle color="$white">🎉 New High Score!</ToastTitle>
              </Toast>
            );
          },
        });
      } else if (reviewData.overallScore >= 7) {
        toast.show({
          placement: 'top',
          render: ({ id }) => {
            return (
              <Toast backgroundColor="$blue600" nativeID={id}>
                <ToastTitle color="$white">Progress saved!</ToastTitle>
              </Toast>
            );
          },
        });
      }
    }
  }, []);

  const handleRetry = () => {
    toast.show({
      placement: 'top',
      render: ({ id }) => {
        return (
          <Toast backgroundColor="$blue600" nativeID={id}>
            <ToastTitle color="$white">Starting new practice session...</ToastTitle>
          </Toast>
        );
      },
    });
    setTimeout(() => router.replace('/(tabs)/explore'), 500);
  };

  const handleNewScenario = () => {
    router.replace('/(tabs)/explore');
  };

  const handlePromptPress = (scenarioId: string) => {
    // TODO: Navigate to explore with selected scenario
    console.log('Selected scenario:', scenarioId);
    router.replace('/(tabs)/explore');
  };

  return (
    <Box flex={1} backgroundColor={colorScheme === 'dark' ? '$black' : '$white'}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 60,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <VStack gap="$lg">
          {/* Header with Avatar and Overall Score */}
          <ReviewHeader
            title={reviewData.title}
            avatarName={reviewData.avatarName}
            avatarImage={reviewData.avatarImage}
            completedAt={reviewData.completedAt}
            overallScore={reviewData.overallScore}
            sentiment={reviewData.sentiment}
          />

          {/* Key Metrics */}
          <MetricGrid metrics={reviewData.metrics} />

          <Divider backgroundColor={colorScheme === 'dark' ? '$gray800' : '$gray200'} />

          {/* Transcript Summary (if available) */}
          {reviewData.transcriptSummary && (
            <VStack gap="$sm">
              <Text
                fontSize={20}
                fontWeight="$bold"
                color={colorScheme === 'dark' ? '$white' : '$black'}
              >
                📝 Summary
              </Text>
              <Box
                backgroundColor={colorScheme === 'dark' ? '$gray900' : '$gray50'}
                borderRadius="$lg"
                padding={16}
                borderWidth={1}
                borderColor={colorScheme === 'dark' ? '$gray800' : '$gray200'}
              >
                <Text
                  fontSize={14}
                  lineHeight={20}
                  color={colorScheme === 'dark' ? '$gray300' : '$gray700'}
                >
                  {reviewData.transcriptSummary}
                </Text>
              </Box>
            </VStack>
          )}

          {/* Feedback: Wins and Opportunities */}
          <FeedbackAccordion wins={reviewData.wins} opportunities={reviewData.opportunities} />

          <Divider backgroundColor={colorScheme === 'dark' ? '$gray800' : '$gray200'} />

          {/* Suggested Next Prompts */}
          <PromptList prompts={reviewData.suggestedPrompts} onPromptPress={handlePromptPress} />

          {/* Action Buttons */}
          <VStack gap="$md" marginTop={16}>
            <Button backgroundColor="$green500" onPress={handleRetry}>
              <ButtonText fontWeight="$bold">Retry This Scenario</ButtonText>
            </Button>

            <Button
              backgroundColor="transparent"
              borderWidth={1}
              borderColor={colorScheme === 'dark' ? '$gray700' : '$gray300'}
              onPress={handleNewScenario}
            >
              <ButtonText color={colorScheme === 'dark' ? '$white' : '$black'} fontWeight="$bold">
                Pick New Scenario
              </ButtonText>
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
}
