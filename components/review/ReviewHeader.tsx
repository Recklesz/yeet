import React from 'react';
import {
  Avatar,
  AvatarImage,
  Badge,
  BadgeText,
  Box,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import cx from 'clsx';

interface ReviewHeaderProps {
  title: string;
  avatarName: string;
  avatarImage: string;
  completedAt: Date;
  overallScore: number;
  sentiment: 'excellent' | 'great' | 'good' | 'needs-work';
}

export function ReviewHeader({
  title,
  avatarName,
  avatarImage,
  completedAt,
  overallScore,
  sentiment,
}: ReviewHeaderProps) {
  const getSentimentStyles = () => {
    switch (sentiment) {
      case 'excellent':
        return { border: 'border-green-600', badge: 'bg-green-600', text: 'text-green-600' };
      case 'great':
        return { border: 'border-green-500', badge: 'bg-green-500', text: 'text-green-500' };
      case 'good':
        return { border: 'border-blue-500', badge: 'bg-blue-500', text: 'text-blue-500' };
      case 'needs-work':
        return { border: 'border-amber-500', badge: 'bg-amber-500', text: 'text-amber-500' };
      default:
        return { border: 'border-gray-500', badge: 'bg-gray-500', text: 'text-gray-500' };
    }
  };

  const getSentimentText = () => {
    switch (sentiment) {
      case 'excellent':
        return 'Excellent!';
      case 'great':
        return 'Great Effort!';
      case 'good':
        return 'Good Work';
      case 'needs-work':
        return 'Keep Practicing';
      default:
        return 'Complete';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const sentimentStyles = getSentimentStyles();

  return (
    <VStack className="gap-4 pb-6">
      {/* Avatar and Info */}
      <HStack className="items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage source={{ uri: avatarImage }} alt={avatarName} />
        </Avatar>

        <VStack className="flex-1 gap-1">
          <Text className={cx('text-lg font-bold', 'text-black')}>{title}</Text>
          <Text className={cx('text-sm', 'text-gray-600')}>
            with {avatarName} • {formatTime(completedAt)}
          </Text>
        </VStack>
      </HStack>

      {/* Overall Score Card */}
      <Box className={cx('rounded-2xl border p-5', 'bg-gray-50', sentimentStyles.border)}>
        <VStack className="gap-3">
          <Text className={cx('text-base font-semibold', 'text-black')}>Overall Performance</Text>
          <HStack className="items-center justify-between">
            <Badge className={cx('rounded-lg', sentimentStyles.badge)}>
              <BadgeText className={cx('text-xs font-bold', 'text-white')}>
                {getSentimentText()}
              </BadgeText>
            </Badge>
            <Text className={cx('text-5xl font-bold', sentimentStyles.text)}>{overallScore}</Text>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  );
}
