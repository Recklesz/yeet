import { IconSymbol } from '@/components/ui/icon-symbol';
import type { FeedbackItem } from '@/constants/review';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Box, HStack, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';

interface FeedbackListProps {
  wins: FeedbackItem[];
  opportunities: FeedbackItem[];
}

export function FeedbackList({ wins, opportunities }: FeedbackListProps) {
  const colorScheme = useColorScheme();

  const renderFeedbackItem = (item: FeedbackItem) => {
    const isWin = item.type === 'win';
    const bgColor = isWin
      ? colorScheme === 'dark'
        ? '$green950'
        : '$green50'
      : colorScheme === 'dark'
        ? '$amber950'
        : '$amber50';
    const borderColor = isWin ? '$green500' : '$amber500';
    const iconColor = isWin
      ? colorScheme === 'dark'
        ? '#10B981'
        : '#059669'
      : colorScheme === 'dark'
        ? '#F59E0B'
        : '#D97706';

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
            <Text
              fontSize={16}
              fontWeight="$bold"
              color={colorScheme === 'dark' ? '$white' : '$black'}
            >
              {item.title}
            </Text>
            <Text fontSize={14} color={colorScheme === 'dark' ? '$gray300' : '$gray700'}>
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
          <Text
            fontSize={20}
            fontWeight="$bold"
            color={colorScheme === 'dark' ? '$white' : '$black'}
          >
            🎉 What Went Well
          </Text>
          <VStack gap="$sm">{wins.map(renderFeedbackItem)}</VStack>
        </VStack>
      )}

      {/* Opportunities Section */}
      {opportunities.length > 0 && (
        <VStack gap="$sm">
          <Text
            fontSize={20}
            fontWeight="$bold"
            color={colorScheme === 'dark' ? '$white' : '$black'}
          >
            💡 Areas to Improve
          </Text>
          <VStack gap="$sm">{opportunities.map(renderFeedbackItem)}</VStack>
        </VStack>
      )}
    </VStack>
  );
}
