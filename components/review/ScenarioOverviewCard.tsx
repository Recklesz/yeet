import { Avatar, AvatarImage, Box, Text, VStack } from '@gluestack-ui/themed';
import cx from 'clsx';
import React from 'react';
import type { ImageSourcePropType } from 'react-native';

interface ScenarioOverviewCardProps {
  title: string;
  avatarName: string;
  avatarImage: ImageSourcePropType;
  avatarSubtitle?: string;
  durationSeconds: number;
  completedAt: Date;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const paddedSecs = secs.toString().padStart(2, '0');
  return `${mins} min ${paddedSecs} sec`;
}

function formatTimestamp(date: Date): string {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  if (isToday) {
    return `Today, ${timePart}`;
  }

  const datePart = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  return `${datePart}, ${timePart}`;
}

export const ScenarioOverviewCard = React.memo(function ScenarioOverviewCard({
  title,
  avatarName,
  avatarImage,
  avatarSubtitle = 'AI Avatar',
  durationSeconds,
  completedAt,
}: ScenarioOverviewCardProps) {
  return (
    <Box className={cx('rounded-3xl border bg-white p-6', 'border-gray-100')}>
      <VStack className="gap-4">
        {/* Header: Left content + Right avatar */}
        <Box className="flex-row items-start justify-between gap-4">
          {/* Left: Scenario label + title */}
          <VStack className="flex-1 gap-2">
            <Text className={cx('text-sm font-medium', 'text-gray-400')}>Scenario</Text>
            <Text className={cx('text-2xl font-semibold', 'text-gray-900')}>{title}</Text>
          </VStack>

          {/* Right: Avatar + metadata */}
          <VStack className="items-end gap-2">
            <Avatar className={cx('h-12 w-12 overflow-hidden rounded-full', 'border-gray-200')}>
              <AvatarImage
                source={avatarImage}
                alt={avatarName}
                className="h-full w-full"
                resizeMode="cover"
              />
            </Avatar>
            <VStack className="items-end gap-0.5">
              <Text className={cx('text-sm font-medium', 'text-gray-900')}>{avatarName}</Text>
              <Text className={cx('text-xs', 'text-gray-400')}>{avatarSubtitle}</Text>
            </VStack>
          </VStack>
        </Box>

        {/* Divider */}
        <Box className="mt-1 h-px bg-gray-200" />

        {/* Stats section */}
        <VStack className="gap-3">
          <Box className="flex-row justify-between">
            <Text className={cx('text-sm', 'text-gray-500')}>Duration</Text>
            <Text className={cx('text-sm font-semibold', 'text-gray-900')}>
              {formatDuration(durationSeconds)}
            </Text>
          </Box>
          <Box className="flex-row justify-between">
            <Text className={cx('text-sm', 'text-gray-500')}>Timestamp</Text>
            <Text className={cx('text-sm font-semibold', 'text-gray-900')}>
              {formatTimestamp(completedAt)}
            </Text>
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
});
