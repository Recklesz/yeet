import React from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { CallStatus } from '@/constants/practice';
import { Box, HStack, Pressable, Spinner } from '@gluestack-ui/themed';

export interface PracticeControlsProps {
  /** Current call status */
  status: CallStatus;
  /** Whether the microphone is muted */
  isMuted: boolean;
  /** Callback to start a practice session */
  onStart: () => void;
  /** Callback to end the practice session */
  onEnd: () => void;
  /** Callback to toggle mute */
  onToggleMute: () => void;
}

/**
 * Control buttons for the Practice screen.
 *
 * Displays different controls based on call status:
 * - `idle`: Start call button (green phone icon)
 * - `connecting`: Spinner (amber)
 * - `connected`: Mute toggle + End call button
 */
export function PracticeControls({
  status,
  isMuted,
  onStart,
  onEnd,
  onToggleMute,
}: PracticeControlsProps) {
  return (
    <HStack gap={24} marginTop={16}>
      {/* Idle state: Start call button */}
      {status === 'idle' && (
        <Pressable
          onPress={onStart}
          backgroundColor="$green500"
          borderRadius="$full"
          padding={20}
          shadowColor="$black"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.25}
          shadowRadius={3.84}
          elevation={5}
        >
          <IconSymbol name="phone.fill" size={32} color="white" />
        </Pressable>
      )}

      {/* Connecting state: Spinner */}
      {status === 'connecting' && (
        <Box backgroundColor="$amber500" borderRadius="$full" padding={20}>
          <Spinner color="white" size="large" />
        </Box>
      )}

      {/* Connected state: Mute toggle + End call button */}
      {status === 'connected' && (
        <>
          <Pressable
            onPress={onToggleMute}
            backgroundColor={isMuted ? '$red500' : '$gray500'}
            borderRadius="$full"
            padding={16}
          >
            <IconSymbol name={isMuted ? 'mic.slash.fill' : 'mic.fill'} size={24} color="white" />
          </Pressable>

          <Pressable onPress={onEnd} backgroundColor="$red500" borderRadius="$full" padding={20}>
            <IconSymbol name="phone.down.fill" size={32} color="white" />
          </Pressable>
        </>
      )}
    </HStack>
  );
}
