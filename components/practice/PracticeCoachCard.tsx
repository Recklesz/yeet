import React from 'react';

import { CallStatus, DATING_COACH, STATUS_CONFIG } from '@/constants/practice';
import { Avatar, AvatarImage, Badge, BadgeText, Box, Text, VStack } from '@gluestack-ui/themed';

export interface PracticeCoachCardProps {
  /** Current call status */
  status: CallStatus;
}

/**
 * Coach avatar card for the Practice screen.
 *
 * Displays:
 * - Coach avatar image
 * - Status badge (colored indicator with dot for active states)
 * - Coach name
 * - Status text (e.g., "Ready to Chat", "Connected")
 */
export function PracticeCoachCard({ status }: PracticeCoachCardProps) {
  const statusConfig = STATUS_CONFIG[status];

  return (
    <VStack alignItems="center" gap="$4">
      {/* Avatar with status badge */}
      <Box position="relative">
        <Avatar className="w-24 h-24">
          <AvatarImage
            source={{ uri: DATING_COACH.avatarUrl }}
            alt={`${DATING_COACH.name} - ${DATING_COACH.title}`}
          />
        </Avatar>

        {/* Status badge (colored dot) */}
        <Badge
          position="absolute"
          top={-6}
          right={-6}
          backgroundColor={statusConfig.color}
          borderRadius={999}
        >
          <BadgeText color="$white" fontSize={10}>
            {statusConfig.badgeIndicator || ''}
          </BadgeText>
        </Badge>
      </Box>

      {/* Coach name and status text */}
      <VStack alignItems="center" gap="$2">
        <Text fontSize={24} fontWeight="$bold" color="$black">
          {DATING_COACH.name}
        </Text>
        <Text fontSize={16} color={statusConfig.color} fontWeight="$medium">
          {statusConfig.text}
        </Text>
      </VStack>
    </VStack>
  );
}
