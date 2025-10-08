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
import { SafeAreaScreen } from '@/components/common/SafeAreaScreen';
import { mockReviewData } from '@/constants/review';

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

  const latestScore = useMemo(() => `${mockReviewData.overallScore}/10`, []);

  return (
    <SafeAreaScreen className="bg-background-0">
      <VStack className="flex-1">
        <StatusBar style="dark" />

        <CustomHeader
          variant="search"
          title="Pick your next rep"
          subtitle="Rehearse real conversations with Sarah before heading out."
          highlightLabel="Last session score"
          highlightValue={latestScore}
          searchPlaceholder="Search scenarios or skills"
          onMicPress={() => router.push('/(tabs)/practice')}
        />

        <ScrollView
          contentContainerClassName="gap-8 px-5 pb-12"
          showsVerticalScrollIndicator={false}
        >
          <VStack className="gap-3">
            {FEATURED_SCENARIOS.map(scenario => (
              <Pressable key={scenario.id} onPress={() => router.push('/(tabs)/practice')}>
                <Box className="rounded-2xl p-4 border bg-gray-50 border-gray-200">
                  <VStack className="gap-2">
                    <HStack className="items-center justify-between">
                      <Text className="text-lg font-semibold text-typography-900">
                        {scenario.title}
                      </Text>
                      <Badge
                        className={`rounded-md px-2 py-0.5 ${
                          scenario.difficulty === 'Easy'
                            ? 'bg-green-500'
                            : scenario.difficulty === 'Medium'
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                        }`}
                      >
                        <BadgeText className="text-white text-xs font-semibold">
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

          <VStack className="gap-2">
            <Text className="text-base font-semibold text-typography-900">
              Quick tips before you go out tonight
            </Text>
            <VStack className="gap-3">
              {PRACTICE_TIPS.map((tip, index) => (
                <Box key={tip} className="rounded-2xl p-4 border bg-gray-50 border-gray-200">
                  <HStack className="items-center gap-2">
                    <Badge className="rounded-full px-2.5 py-0.5 bg-purple-600">
                      <BadgeText className="text-white font-bold">{index + 1}</BadgeText>
                    </Badge>
                    <Text className="flex-1 text-sm text-typography-600">{tip}</Text>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </VStack>
        </ScrollView>
      </VStack>
    </SafeAreaScreen>
  );
}
