import {
  Badge,
  BadgeText,
  Box,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';

import { CustomHeader } from '@/components/common/CustomHeader';
import { mockReviewData } from '@/constants/review';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Scenario = {
  id: string;
  title: string;
  goal: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  duration: string;
};

const FEATURED_SCENARIOS: Scenario[] = [
  {
    id: 'coffee-first-date',
    title: 'Coffee Shop First Date',
    goal: 'Practice warm openers and playful banter.',
    difficulty: 'Easy',
    duration: '5 min',
  },
  {
    id: 'mutual-friend-intro',
    title: 'Mutual Friend Introduction',
    goal: 'Build rapport fast after being introduced.',
    difficulty: 'Medium',
    duration: '6 min',
  },
  {
    id: 'cold-approach',
    title: 'Cold Approach at a Bookstore',
    goal: 'Stay confident and curious with strangers.',
    difficulty: 'Challenging',
    duration: '8 min',
  },
];

const PRACTICE_TIPS = [
  'Listen for emotional cues and mirror them back.',
  'Use “because” when making suggestions to feel more collaborative.',
  'Rehearse your closing lines so you always know how to wrap up.',
];

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const latestScore = useMemo(() => `${mockReviewData.overallScore}/10`, []);

  return (
    <VStack className="flex-1 bg-background-0">
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <CustomHeader
        variant="search"
        title="Pick your next rep"
        subtitle="Rehearse real conversations with Sarah before heading out."
        highlightLabel="Last session score"
        highlightValue={latestScore}
        searchPlaceholder="Search scenarios or skills"
        onMicPress={() => router.push('/(tabs)/explore')}
      />

      <ScrollView contentContainerClassName="gap-8 px-5 pb-12" showsVerticalScrollIndicator={false}>
        <VStack space="sm">
          <Text className="text-base font-semibold text-typography-900">Continue practicing</Text>
          <Text className="text-sm text-typography-500">
            These scenarios match where you left off.
          </Text>
        </VStack>

        <VStack space="md">
          {FEATURED_SCENARIOS.map(scenario => (
            <Pressable key={scenario.id} onPress={() => router.push('/(tabs)/explore')}>
              <Box
                className="rounded-2xl p-4"
                bg={isDark ? '$gray900' : '$gray50'}
                borderWidth={1}
                borderColor={isDark ? '$gray800' : '$gray200'}
              >
                <VStack space="sm">
                  <HStack className="items-center justify-between">
                    <Text className="text-lg font-semibold text-typography-900">
                      {scenario.title}
                    </Text>
                    <Badge
                      bg={
                        scenario.difficulty === 'Easy'
                          ? '$green500'
                          : scenario.difficulty === 'Medium'
                            ? '$amber500'
                            : '$red500'
                      }
                      borderRadius="$md"
                      px={8}
                      py={2}
                    >
                      <BadgeText color="$white" fontSize={12} fontWeight="$semibold">
                        {scenario.difficulty}
                      </BadgeText>
                    </Badge>
                  </HStack>

                  <Text className="text-sm text-typography-600">{scenario.goal}</Text>

                  <Text className="text-xs text-typography-500">
                    {scenario.duration} • Guided by Sarah
                  </Text>
                </VStack>
              </Box>
            </Pressable>
          ))}
        </VStack>

        <VStack space="sm">
          <Text className="text-base font-semibold text-typography-900">
            Quick tips before you go out tonight
          </Text>
          <VStack space="md">
            {PRACTICE_TIPS.map((tip, index) => (
              <Box
                key={tip}
                className="rounded-2xl p-4"
                bg={isDark ? '$gray900' : '$gray50'}
                borderWidth={1}
                borderColor={isDark ? '$gray800' : '$gray200'}
              >
                <HStack className="items-center" space="sm">
                  <Badge
                    bg={isDark ? '$purple800' : '$purple600'}
                    borderRadius="$full"
                    px={10}
                    py={2}
                  >
                    <BadgeText color="$white" fontWeight="$bold">
                      {index + 1}
                    </BadgeText>
                  </Badge>
                  <Text className="flex-1 text-sm text-typography-600">{tip}</Text>
                </HStack>
              </Box>
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
