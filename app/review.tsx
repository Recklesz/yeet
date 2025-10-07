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
import clsx from 'clsx';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import Animated from 'react-native-reanimated';

import { AnimatedHeader } from '@/components/common/AnimatedHeader';
import { FeedbackAccordion } from '@/components/review/FeedbackAccordion';
import { MetricGrid } from '@/components/review/MetricGrid';
import { PromptList } from '@/components/review/PromptList';
import { ReviewHeader } from '@/components/review/ReviewHeader';
import { mockReviewData } from '@/constants/review';
import { useAnimatedHeader } from '@/hooks/use-animated-header';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ReviewScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const toast = useToast();
  const hasShownToast = useRef(false);
  const {
    height: headerHeight,
    headerStyle,
    handleScroll,
  } = useAnimatedHeader({
    maxHeight: 320,
    minHeight: 140,
  });

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
  }, [reviewData.overallScore, toast]);

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

  const handleShare = () => {
    Alert.alert(
      'Share coming soon',
      'You will soon be able to export highlights from this review.'
    );
  };

  const formattedCompletedAt = reviewData.completedAt.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  const headerSubtitle = `Practice with ${reviewData.avatarName} • ${formattedCompletedAt}`;

  return (
    <Box className={clsx('flex-1', isDark ? 'bg-black' : 'bg-white')}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Animated.View className="absolute left-0 right-0 top-0 z-10" style={[headerStyle]}>
        <AnimatedHeader
          height={headerHeight}
          maxHeight={320}
          minHeight={140}
          title={reviewData.title}
          subtitle={headerSubtitle}
          rightContent={`${Math.round(reviewData.overallScore)}%`}
          topRightIcon="share-2"
          onTopRightIconPress={handleShare}
        />
      </Animated.View>

      <Animated.ScrollView
        className="flex-1"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerClassName="pt-[320px] px-5 pb-12"
        showsVerticalScrollIndicator={false}
      >
        <VStack space="lg">
          <ReviewHeader
            title={reviewData.title}
            avatarName={reviewData.avatarName}
            avatarImage={reviewData.avatarImage}
            completedAt={reviewData.completedAt}
            overallScore={reviewData.overallScore}
            sentiment={reviewData.sentiment}
          />

          <MetricGrid metrics={reviewData.metrics} />

          <Divider backgroundColor={isDark ? '$gray800' : '$gray200'} />

          {reviewData.transcriptSummary && (
            <VStack space="sm">
              <Text className={clsx('text-xl font-bold', isDark ? 'text-white' : 'text-black')}>
                📝 Summary
              </Text>
              <Box
                className={clsx(
                  'rounded-2xl border p-4',
                  isDark ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'
                )}
              >
                <Text
                  className={clsx('text-sm leading-5', isDark ? 'text-gray-300' : 'text-gray-700')}
                >
                  {reviewData.transcriptSummary}
                </Text>
              </Box>
            </VStack>
          )}

          <FeedbackAccordion wins={reviewData.wins} opportunities={reviewData.opportunities} />

          <Divider backgroundColor={isDark ? '$gray800' : '$gray200'} />

          <PromptList prompts={reviewData.suggestedPrompts} onPromptPress={handlePromptPress} />

          <VStack space="md" className="mt-4">
            <Button className="bg-green-500" onPress={handleRetry}>
              <ButtonText className="font-bold text-white">Retry This Scenario</ButtonText>
            </Button>

            <Button
              className={clsx(
                'border bg-transparent',
                isDark ? 'border-gray-700' : 'border-gray-300'
              )}
              onPress={handleNewScenario}
            >
              <ButtonText className={clsx('font-bold', isDark ? 'text-white' : 'text-black')}>
                Pick New Scenario
              </ButtonText>
            </Button>
          </VStack>
        </VStack>
      </Animated.ScrollView>
    </Box>
  );
}
