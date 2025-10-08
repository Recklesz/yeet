import React from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { PRACTICE_COPY } from '@/constants/practice';
import { HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';

export interface PracticeHeaderProps {
  /**
   * Callback when "How it works" is pressed.
   * Typically opens a modal, alert, or bottom sheet with instructions.
   */
  onHowItWorksPress: () => void;
}

/**
 * Header for the Practice screen.
 *
 * Displays:
 * - Title (e.g., "Practice with Sarah")
 * - Subtitle (e.g., "Warm up with a guided conversation...")
 * - "How it works" info link
 */
export function PracticeHeader({ onHowItWorksPress }: PracticeHeaderProps) {
  return (
    <VStack alignItems="center" gap="$2" marginTop={16}>
      <Text fontSize={28} fontWeight="$bold" color="$black">
        {PRACTICE_COPY.headerTitle}
      </Text>
      <Text fontSize={14} color="$gray600" textAlign="center">
        {PRACTICE_COPY.headerSubtitle}
      </Text>
      <Pressable onPress={onHowItWorksPress} marginTop={4}>
        <HStack gap="$1" alignItems="center">
          <Text fontSize={13} color="$blue600" fontWeight="$medium">
            How it works
          </Text>
          <IconSymbol name="info.circle" size={14} color="#2563eb" />
        </HStack>
      </Pressable>
    </VStack>
  );
}
