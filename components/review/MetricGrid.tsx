import { IconSymbol } from '@/components/ui/icon-symbol';
import type { Metric } from '@/constants/review';
import { Box, HStack, Text, VStack } from '@gluestack-ui/themed';
import cx from 'clsx';
import React from 'react';

interface MetricGridProps {
  metrics: Metric[];
}

export function MetricGrid({ metrics }: MetricGridProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-blue-500';
    if (score >= 40) return 'text-amber-500';
    return 'text-red-500';
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const clampToPercentage = (score: number) => Math.max(0, Math.min(100, score));

  return (
    <VStack className="gap-4">
      <Text className={cx('text-xl font-bold', 'text-black')}>Key Metrics</Text>

      {/* 2-column responsive grid */}
      <Box className="flex-row flex-wrap gap-3">
        {metrics.map(metric => {
          const progressValue = clampToPercentage(metric.score);

          return (
            <Box
              key={metric.id}
              className={cx(
                'flex-1 min-w-[45%] rounded-2xl border p-4',
                'border-gray-200 bg-gray-50'
              )}
            >
              <VStack className="mb-2 gap-2">
                <Text className={cx('text-2xl font-bold', getScoreColor(metric.score))}>
                  {metric.score}
                </Text>
                <HStack className="items-center gap-2">
                  <IconSymbol name={metric.icon as any} size={16} color="#64748b" />
                  <Text className={cx('text-sm font-semibold', 'text-black')}>
                    {metric.label}
                  </Text>
                </HStack>
              </VStack>

              {/* Progress Bar */}
              <Box className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
                <Box
                  className={cx('h-full rounded-full', getProgressBarColor(metric.score))}
                  style={{ width: `${progressValue}%` }}
                />
              </Box>

              <Text className={cx('text-xs leading-relaxed', 'text-gray-600')}>
                {metric.description}
              </Text>
            </Box>
          );
        })}
      </Box>
    </VStack>
  );
}
