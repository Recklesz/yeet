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
import cx from 'clsx';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import Animated from 'react-native-reanimated';

import { AnimatedHeader } from '@/components/common/AnimatedHeader';
import { SafeAreaScreen } from '@/components/common/SafeAreaScreen';
import { FeedbackAccordion } from '@/components/review/FeedbackAccordion';
import { MetricGrid } from '@/components/review/MetricGrid';
import { PromptList } from '@/components/review/PromptList';
import { ReviewHeader } from '@/components/review/ReviewHeader';
import { mockReviewData } from '@/constants/review';
import { useAnimatedHeader } from '@/hooks/use-animated-header';

export default function ReviewScreen() {
  const router = useRouter();
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
    <SafeAreaScreen style={{ backgroundColor: '#ffffff' }}>
      <Box className="flex-1">
        <StatusBar style="dark" />

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
          contentContainerClassName="pt-[320px] px-5 pb-20"
          showsVerticalScrollIndicator={false}
        >
          <VStack className="gap-6">
            <ReviewHeader
              title={reviewData.title}
              avatarName={reviewData.avatarName}
              avatarImage={reviewData.avatarImage}
              completedAt={reviewData.completedAt}
              overallScore={reviewData.overallScore}
              sentiment={reviewData.sentiment}
            />

            <MetricGrid metrics={reviewData.metrics} />

            <Divider backgroundColor="$gray200" />

            {reviewData.transcriptSummary && (
              <VStack className="gap-3">
                <Text className={cx('text-xl font-bold', 'text-black')}>📝 Summary</Text>
                <Box className={cx('rounded-2xl border p-4', 'border-gray-200 bg-gray-50')}>
                  <Text className={cx('text-sm leading-5', 'text-gray-700')}>
                    {reviewData.transcriptSummary}
                  </Text>
                </Box>
              </VStack>
            )}

            <FeedbackAccordion opportunities={reviewData.opportunities} />

            <Divider backgroundColor="$gray200" />

            <PromptList prompts={reviewData.suggestedPrompts} onPromptPress={handlePromptPress} />

            <VStack className="mt-6 gap-4">
              <Button className="bg-[#00D9FF]" onPress={handleRetry}>
                <ButtonText className="font-bold text-white">Retry This Scenario</ButtonText>
              </Button>

              <Button
                className={cx('border bg-transparent', 'border-gray-300')}
                onPress={handleNewScenario}
              >
                <ButtonText className={cx('font-bold', 'text-[#0A1628]')}>
                  Pick New Scenario
                </ButtonText>
              </Button>
            </VStack>
          </VStack>
        </Animated.ScrollView>
      </Box>
    </SafeAreaScreen>
  );
}
