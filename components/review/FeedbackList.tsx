import { IconSymbol } from '@/components/ui/icon-symbol';
import type { FeedbackItem } from '@/constants/review';
import { Box, HStack, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';

interface FeedbackListProps {
  wins: FeedbackItem[];
  opportunities: FeedbackItem[];
}

export function FeedbackList({ wins, opportunities }: FeedbackListProps) {
  const renderFeedbackItem = (item: FeedbackItem) => {
    const isWin = item.type === 'win';
    const bgColor = isWin ? '$green50' : '$amber50';
    const borderColor = isWin ? '$green500' : '$amber500';

    return (
      <Box
        key={item.id}
        backgroundColor={bgColor}
        borderRadius="$lg"
        padding={16}
        borderWidth={1}
        borderColor={borderColor}
      >
        <HStack gap="$md" alignItems="flex-start">
          <Box backgroundColor={borderColor} borderRadius="$full" padding={8} marginTop={2}>
            <IconSymbol name={item.icon as any} size={16} color="white" />
          </Box>

          <VStack flex={1} gap="$xs">
            <Text fontSize={16} fontWeight="$bold" color="$black">
              {item.title}
            </Text>
            <Text fontSize={14} color="$gray700">
              {item.description}
            </Text>
          </VStack>
        </HStack>
      </Box>
    );
  };

  return (
    <VStack gap="$xl">
      {/* Wins Section */}
      {wins.length > 0 && (
        <VStack gap="$sm">
          <Text fontSize={20} fontWeight="$bold" color="$black">
            🎉 What Went Well
          </Text>
          <VStack gap="$sm">{wins.map(renderFeedbackItem)}</VStack>
        </VStack>
      )}

      {/* Opportunities Section */}
      {opportunities.length > 0 && (
        <VStack gap="$sm">
          <Text fontSize={20} fontWeight="$bold" color="$black">
            Areas to Improve
          </Text>
          <VStack gap="$sm">{opportunities.map(renderFeedbackItem)}</VStack>
        </VStack>
      )}
    </VStack>
  );
}
