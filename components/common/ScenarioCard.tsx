import { HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';
import { Image } from 'expo-image';
import React from 'react';

import type { ScenarioCardMeta, ScenarioLevel } from '@/constants/practice';

interface ScenarioCardProps {
  scenario: ScenarioCardMeta;
  onPress?: () => void;
}

const LEVEL_STYLES: Record<ScenarioLevel, string> = {
  Beginner: 'bg-success-100',
  Intermediate: 'bg-warning-100',
  Advanced: 'bg-error-100',
};

const LEVEL_TEXT_STYLES: Record<ScenarioLevel, string> = {
  Beginner: 'text-success-700',
  Intermediate: 'text-warning-700',
  Advanced: 'text-error-700',
};

export function ScenarioCard({ scenario, onPress }: ScenarioCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-64 flex-shrink-0 rounded-3xl border border-outline-100 bg-background-0 p-4 shadow-soft-1"
    >
      <VStack className="gap-3">
        {/* Image */}
        <Image
          source={{ uri: scenario.imageUri }}
          style={{ width: '100%', height: 160, borderRadius: 16 }}
          contentFit="cover"
          accessibilityLabel={`${scenario.title} scenario artwork`}
        />

        {/* Title */}
        <Text className="text-center text-lg font-semibold text-typography-900">
          {scenario.title}
        </Text>

        {/* Summary */}
        <Text className="text-center text-sm text-typography-600" numberOfLines={2}>
          {scenario.summary}
        </Text>

        {/* Footer Chips */}
        <HStack className="items-center justify-center gap-1.5">
          {/* Level Chip */}
          <HStack
            className={`items-center justify-center self-center rounded-full px-1.5 py-0.5 ${LEVEL_STYLES[scenario.level]}`}
          >
            <Text className={`text-[11px] font-medium ${LEVEL_TEXT_STYLES[scenario.level]}`}>
              {scenario.level}
            </Text>
          </HStack>

          {/* Duration Chip */}
          <HStack className="items-center justify-center self-center rounded-full bg-background-100 px-1.5 py-0.5">
            <Text className="text-[11px] font-medium text-typography-700">
              {scenario.durationMinutes} mins
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Pressable>
  );
}
