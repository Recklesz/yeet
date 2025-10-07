import { IconSymbol } from '@/components/ui/icon-symbol';
import type { Metric } from '@/constants/review';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Box, HStack, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';

interface MetricGridProps {
  metrics: Metric[];
}

export function MetricGrid({ metrics }: MetricGridProps) {
  const colorScheme = useColorScheme();

  const getScoreColor = (score: number) => {
    if (score >= 80) return '$green500';
    if (score >= 60) return '$blue500';
    if (score >= 40) return '$amber500';
    return '$red500';
  };

  const clampToPercentage = (score: number) => Math.max(0, Math.min(100, score));

  return (
    <VStack gap="$md">
      <Text fontSize={20} fontWeight="$bold" color={colorScheme === 'dark' ? '$white' : '$black'}>
        Key Metrics
      </Text>

      <VStack gap="$sm">
        {metrics.map(metric => {
          const progressValue = clampToPercentage(metric.score);

          return (
            <Box
              key={metric.id}
              backgroundColor={colorScheme === 'dark' ? '$gray900' : '$gray50'}
              borderRadius="$lg"
              padding={16}
              borderWidth={1}
              borderColor={colorScheme === 'dark' ? '$gray800' : '$gray200'}
            >
              <HStack justifyContent="space-between" alignItems="center" marginBottom={8}>
                <HStack gap="$sm" alignItems="center" flex={1}>
                  <IconSymbol
                    name={metric.icon as any}
                    size={20}
                    color={colorScheme === 'dark' ? '#9CA3AF' : '#6B7280'}
                  />
                  <Text
                    fontSize={16}
                    fontWeight="$semibold"
                    color={colorScheme === 'dark' ? '$white' : '$black'}
                  >
                    {metric.label}
                  </Text>
                </HStack>

                <Text fontSize={24} fontWeight="$bold" color={getScoreColor(metric.score)}>
                  {metric.score}
                </Text>
              </HStack>

              {/* Progress Bar */}
              <Box
                backgroundColor={colorScheme === 'dark' ? '$gray800' : '$gray200'}
                height={8}
                borderRadius="$full"
                overflow="hidden"
                marginBottom={8}
              >
                <Box
                  backgroundColor={getScoreColor(metric.score)}
                  height="100%"
                  borderRadius="$full"
                  width={`${progressValue}%`}
                />
              </Box>

              <Text fontSize={13} color={colorScheme === 'dark' ? '$gray400' : '$gray600'}>
                {metric.description}
              </Text>
            </Box>
          );
        })}
      </VStack>
    </VStack>
  );
}
