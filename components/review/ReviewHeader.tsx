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
import { useColorScheme } from '@/hooks/use-color-scheme';

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
  const colorScheme = useColorScheme();

  const getSentimentColor = () => {
    switch (sentiment) {
      case 'excellent':
        return '$green600';
      case 'great':
        return '$green500';
      case 'good':
        return '$blue500';
      case 'needs-work':
        return '$amber500';
      default:
        return '$gray500';
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

  return (
    <VStack gap="$md" paddingBottom={24}>
      {/* Avatar and Score Badge */}
      <HStack gap="$md" alignItems="center">
        <Avatar sx={{ width: 64, height: 64 }}>
          <AvatarImage source={{ uri: avatarImage }} alt={avatarName} />
        </Avatar>

        <VStack flex={1} gap="$xs">
          <Text
            fontSize={18}
            fontWeight="$bold"
            color={colorScheme === 'dark' ? '$white' : '$black'}
          >
            {title}
          </Text>
          <Text fontSize={14} color={colorScheme === 'dark' ? '$gray400' : '$gray600'}>
            with {avatarName} • {formatTime(completedAt)}
          </Text>
        </VStack>
      </HStack>

      {/* Overall Score Card */}
      <Box
        backgroundColor={colorScheme === 'dark' ? '$gray900' : '$gray50'}
        borderRadius="$lg"
        padding={16}
        borderWidth={1}
        borderColor={getSentimentColor()}
      >
        <HStack justifyContent="space-between" alignItems="center">
          <VStack gap="$xs">
            <Text
              fontSize={16}
              fontWeight="$semibold"
              color={colorScheme === 'dark' ? '$white' : '$black'}
            >
              Overall Performance
            </Text>
            <Badge backgroundColor={getSentimentColor()} borderRadius="$md" alignSelf="flex-start">
              <BadgeText color="$white" fontSize={12} fontWeight="$bold">
                {getSentimentText()}
              </BadgeText>
            </Badge>
          </VStack>

          <Text fontSize={48} fontWeight="$bold" color={getSentimentColor()}>
            {overallScore}
          </Text>
        </HStack>
      </Box>
    </VStack>
  );
}
