import React from 'react';

import { PracticeTip } from '@/constants/practice';
import { Text, VStack } from '@gluestack-ui/themed';

export interface PracticeTipCardProps {
  /** The tip to display */
  tip: PracticeTip;
}

/**
 * Tip card for the Practice screen.
 *
 * Displays practice tips to help users improve their conversation skills.
 */
export function PracticeTipCard({ tip }: PracticeTipCardProps) {
  return (
    <VStack width="100%" padding={20} backgroundColor="$gray50" borderRadius="$lg" gap="$3">
      <Text fontSize={16} fontWeight="$semibold" color="$black">
        {tip.title}
      </Text>
      <Text fontSize={14} lineHeight={20} color="$gray700">
        {tip.content}
      </Text>
    </VStack>
  );
}
