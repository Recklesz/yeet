import { Avatar, AvatarImage, Box, Text, VStack } from '@gluestack-ui/themed';
import cx from 'clsx';
import React from 'react';
import type { ImageSourcePropType } from 'react-native';

interface ScenarioOverviewCardProps {
  title: string;
  avatarName: string;
  avatarImage: ImageSourcePropType;
  durationSeconds: number;
  completedAt: Date;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins} min ${secs} sec`;
}

function formatTimestamp(date: Date): string {
  const datePart = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  return `${datePart} at ${timePart}`;
}

export const ScenarioOverviewCard = React.memo(function ScenarioOverviewCard({
  title,
  avatarName,
  avatarImage,
  durationSeconds,
  completedAt,
}: ScenarioOverviewCardProps) {
  return (
    <Box className={cx('rounded-3xl border bg-white p-6 ', 'border-gray-200')}>
      <VStack className="gap-6">
        {/* Header: Scenario label + title */}
        <VStack className="items-center gap-3">
          <Text className={cx('text-xs font-semibold uppercase tracking-[0.2em]', 'text-gray-500')}>
            Scenario
          </Text>
          <Text className={cx('text-center text-3xl font-bold', 'text-gray-900')}>{title}</Text>

          <VStack className="items-center gap-3">
            <Avatar
              className={cx('h-16 w-16 overflow-hidden rounded-full border-2', 'border-gray-200')}
            >
              <AvatarImage
                source={avatarImage}
                alt={avatarName}
                className="h-full w-full"
                resizeMode="cover"
              />
            </Avatar>
            <VStack className="items-center gap-1">
              <Text className={cx('text-lg font-semibold', 'text-gray-900')}>{avatarName}</Text>
              <Text className={cx('text-sm font-medium', 'text-gray-500')}>Cute</Text>
            </VStack>
          </VStack>
        </VStack>

        {/* Divider */}
        <Box className="h-px bg-gray-200" />

        {/* Stats section */}
        <VStack className="items-center gap-4">
          <VStack className="items-center gap-1">
            <Text className={cx('text-sm font-medium', 'text-gray-500')}>Duration</Text>
            <Text className={cx('text-lg font-semibold', 'text-gray-900')}>
              {formatDuration(durationSeconds)}
            </Text>
          </VStack>
          <VStack className="items-center gap-1">
            <Text className={cx('text-sm font-medium', 'text-gray-500')}>Completed</Text>
            <Text className={cx('text-lg font-semibold', 'text-gray-900')}>
              {formatTimestamp(completedAt)}
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
});
