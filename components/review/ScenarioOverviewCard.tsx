import { Avatar, AvatarImage, Box, HStack, Text, VStack } from '@gluestack-ui/themed';
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
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export const ScenarioOverviewCard = React.memo(function ScenarioOverviewCard({
  title,
  avatarName,
  avatarImage,
  durationSeconds,
  completedAt,
}: ScenarioOverviewCardProps) {
  return (
    <Box className={cx('rounded-2xl border bg-white p-5 shadow-sm', 'border-gray-200')}>
      <VStack className="gap-4">
        {/* Header: Scenario label + title */}
        <VStack className="gap-2">
          <Text className={cx('text-xs font-medium uppercase tracking-wide', 'text-gray-500')}>
            Scenario
          </Text>
          <HStack className="items-center justify-between gap-4">
            <Text className={cx('flex-1 text-2xl font-bold', 'text-gray-900')}>{title}</Text>

            <HStack className="items-center gap-3">
              <Avatar
                className={cx('h-12 w-12 overflow-hidden rounded-full border-2', 'border-gray-200')}
              >
                <AvatarImage
                  source={avatarImage}
                  alt={avatarName}
                  className="h-full w-full"
                  resizeMode="cover"
                />
              </Avatar>
              <VStack className="gap-0.5 items-end">
                <Text className={cx('text-base font-semibold', 'text-gray-900')}>{avatarName}</Text>
                <Text className={cx('text-sm', 'text-gray-500')}>Cute AI Coach</Text>
              </VStack>
            </HStack>
          </HStack>
        </VStack>

        {/* Divider */}
        <Box className="h-px bg-gray-200" />

        {/* Stats row */}
        <VStack className="gap-3">
          <HStack className="items-center justify-between">
            <Text className={cx('text-xs font-medium', 'text-gray-500')}>Duration</Text>
            <Text className={cx('text-sm font-semibold', 'text-gray-900')}>
              {formatDuration(durationSeconds)}
            </Text>
          </HStack>
          <HStack className="items-center justify-between">
            <Text className={cx('text-xs font-medium', 'text-gray-500')}>Completed</Text>
            <Text className={cx('text-sm font-semibold', 'text-gray-900')}>
              {formatTimestamp(completedAt)}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
});
