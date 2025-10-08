import { Box, Divider, Text, Toast, ToastTitle, useToast, VStack } from '@gluestack-ui/themed';
import cx from 'clsx';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import Animated, { interpolate, useDerivedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SafeAreaScreen } from '@/components/common/SafeAreaScreen';
import { YeetButton } from '@/components/common/YeetButton';
import { CircularScoreGauge } from '@/components/review/CircularScoreGauge';
import { FeedbackAccordion } from '@/components/review/FeedbackAccordion';
import { MetricGrid } from '@/components/review/MetricGrid';
import { PromptList } from '@/components/review/PromptList';
import { ReviewHeader } from '@/components/review/ReviewHeader';
import { ScenarioOverviewCard } from '@/components/review/ScenarioOverviewCard';
import { mockReviewData } from '@/constants/review';
import { HEADER_HEIGHTS } from '@/constants/ui-tokens';
import { useAnimatedHeader } from '@/hooks/use-animated-header';

export default function ReviewScreen() {
  const router = useRouter();
  const toast = useToast();
  const hasShownToast = useRef(false);
  const insets = useSafeAreaInsets();
  const {
    height: headerHeight,
    headerStyle,
    handleScroll,
    animatedHeight,
  } = useAnimatedHeader({
    maxHeight: HEADER_HEIGHTS.max,
    minHeight: HEADER_HEIGHTS.min,
  });

  // Calculate sentiment text opacity - fade out as header collapses
  const sentimentTextOpacity = useDerivedValue(() => {
    return interpolate(
      animatedHeight.value,
      [HEADER_HEIGHTS.min, HEADER_HEIGHTS.max],
      [0, 1],
      'clamp'
    );
  });

  // Calculate content padding to account for header + safe area
  const contentPaddingTop = HEADER_HEIGHTS.max + insets.top;

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
    setTimeout(() => router.replace('/(tabs)/practice'), 500);
  };

  const handleNewScenario = () => {
    router.replace('/(tabs)/practice');
  };

  const handlePromptPress = (scenarioId: string) => {
    // TODO: Navigate to explore with selected scenario
    console.log('Selected scenario:', scenarioId);
    router.replace('/(tabs)/practice');
  };

  return (
    <SafeAreaScreen className="bg-white" edges={['top', 'left', 'right']}>
      <Box className="flex-1">
        <StatusBar style="dark" />

        <Animated.View className="absolute left-0 right-0 top-0 z-10" style={[headerStyle]}>
          <ReviewHeader
            height={headerHeight}
            maxHeight={HEADER_HEIGHTS.max}
            minHeight={HEADER_HEIGHTS.min}
            title=""
            metricContent={
              <CircularScoreGauge
                score={reviewData.overallScore}
                sentiment={reviewData.sentiment}
                showSentimentText={true}
                variant="light"
                sentimentTextOpacity={sentimentTextOpacity}
              />
            }
          />
        </Animated.View>

        <Animated.ScrollView
          className="flex-1"
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingTop: contentPaddingTop }}
          contentContainerClassName="px-5 pb-20"
          showsVerticalScrollIndicator={false}
        >
          <VStack className="gap-6">
            <ScenarioOverviewCard
              title={reviewData.title}
              avatarName={reviewData.avatarName}
              avatarImage={require('@/assets/images/avatars/cute_lady_1.png')}
              avatarSubtitle="Cute"
              durationSeconds={reviewData.durationSeconds}
              completedAt={reviewData.completedAt}
            />

            <MetricGrid metrics={reviewData.metrics} />

            <Divider backgroundColor="$gray200" />

            {reviewData.transcriptSummary && (
              <VStack className="gap-3">
                <Text className={cx('text-xl font-bold', 'text-black')}>Summary</Text>
                <Box className={cx('rounded-2xl p-4', 'bg-gray-50')}>
                  <Text className={cx('text-sm leading-5', 'text-gray-700')}>
                    {reviewData.transcriptSummary}
                  </Text>
                </Box>
              </VStack>
            )}

            <FeedbackAccordion opportunities={reviewData.opportunities} />

            <Divider backgroundColor="$gray200" />

            <PromptList prompts={reviewData.suggestedPrompts} onPromptPress={handlePromptPress} />

            <VStack className="mt-6 gap-3">
              <YeetButton variant="primary" size="lg" onPress={handleRetry}>
                Retry This Scenario
              </YeetButton>

              <YeetButton variant="secondary" size="lg" onPress={handleNewScenario}>
                Pick New Scenario
              </YeetButton>
            </VStack>
          </VStack>
        </Animated.ScrollView>
      </Box>
    </SafeAreaScreen>
  );
}
