import React from 'react';
import { Text, View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { CallStatus } from '@/constants/practice';
import { PRACTICE_MODE } from '@/constants/runtime';
import { COLORS } from '@/constants/ui-tokens';
import { Pressable, Spinner } from '@gluestack-ui/themed';

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
 * - `idle`: Hidden (controlled by Begin Practice button in main screen)
 * - `connecting`: Centered spinner
 * - `connected`: Three-button cluster (mute | stop | speaker)
 */
export function PracticeControls({ status, isMuted, onEnd, onToggleMute }: PracticeControlsProps) {
  // Idle state: no controls shown (handled by main screen)
  if (status === 'idle') {
    return null;
  }

  // Connecting state: centered spinner
  if (status === 'connecting') {
    return (
      <View className="items-center">
        <View className="w-16 h-16 rounded-full bg-warning-500 items-center justify-center shadow-lg">
          <Spinner color={COLORS.white.solid} size="large" />
        </View>
      </View>
    );
  }

  // Connected state: three-button cluster
  if (status === 'connected') {
    return (
      <View>
        <View className="flex-row items-center justify-center gap-4">
          {/* Left: Mute/Unmute button */}
          <Pressable
            onPress={onToggleMute}
            className="w-14 h-14 rounded-full bg-typography-0 items-center justify-center shadow-lg"
          >
            <IconSymbol
              name={isMuted ? 'mic.slash.fill' : 'mic.fill'}
              size={24}
              color={isMuted ? COLORS.error[500] : COLORS.typography[900]}
            />
          </Pressable>

          {/* Center: Stop button (larger, red) */}
          <Pressable
            onPress={onEnd}
            className="w-16 h-16 rounded-full bg-error-500 items-center justify-center shadow-lg"
          >
            <IconSymbol name="xmark" size={28} color={COLORS.white.solid} weight="bold" />
          </Pressable>

          {/* Right: Volume button (placeholder for output control) */}
          <Pressable className="w-14 h-14 rounded-full bg-typography-0 items-center justify-center shadow-lg">
            <IconSymbol name="speaker.wave.3.fill" size={24} color={COLORS.typography[900]} />
          </Pressable>
        </View>

        {/* Dev mode indicator - only shown in __DEV__ and mock mode */}
        {__DEV__ && PRACTICE_MODE === 'mock' && (
          <View className="mt-4 items-center">
            <View className="bg-warning-500/90 px-3 py-1.5 rounded-full">
              <Text className="text-xs font-semibold text-typography-900">
                MOCK MODE - No API calls
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }

  return null;
}
