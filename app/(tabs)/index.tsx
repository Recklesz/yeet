import { Badge, BadgeText, Box, HStack, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo } from 'react';
import { FlatList } from 'react-native';

import { CustomHeader } from '@/components/common/CustomHeader';
import { SafeAreaScreen } from '@/components/common/SafeAreaScreen';
import { ScenarioCard } from '@/components/common/ScenarioCard';
import { HOME_SCENARIO_CARDS } from '@/constants/practice';
import { mockReviewData } from '@/constants/review';

const PRACTICE_TIPS = [
  'Listen for emotional cues and mirror them back.',
  'Use “because” when making suggestions to feel more collaborative.',
  'Rehearse your closing lines so you always know how to wrap up.',
];

export default function HomeScreen() {
  const router = useRouter();

  const latestScore = useMemo(() => `${mockReviewData.overallScore}/10`, []);

  return (
    <SafeAreaScreen className="bg-background-0" edges={['top', 'left', 'right']}>
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

        <ScrollView contentContainerClassName="gap-8 pb-12" showsVerticalScrollIndicator={false}>
          <VStack className="gap-4">
            <VStack className="gap-2 px-5">
              <Text className="text-xl font-semibold text-typography-900">Pick a scenario</Text>
              <Text className="text-sm text-typography-600">
                Choose a vibe and jump into practice
              </Text>
            </VStack>

            <FlatList
              data={HOME_SCENARIO_CARDS}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 16,
                paddingHorizontal: 20,
                paddingVertical: 12,
              }}
              snapToAlignment="center"
              decelerationRate="fast"
              renderItem={({ item }) => (
                <ScenarioCard scenario={item} onPress={() => router.push('/(tabs)/practice')} />
              )}
            />
          </VStack>

          <VStack className="gap-2 px-5">
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
