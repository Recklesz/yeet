import React from 'react';
import { View } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { CallStatus } from '@/constants/practice';
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
        <View className="w-16 h-16 rounded-full bg-amber-500 items-center justify-center shadow-lg">
          <Spinner color="white" size="large" />
        </View>
      </View>
    );
  }

  // Connected state: three-button cluster
  if (status === 'connected') {
    return (
      <View className="flex-row items-center justify-center gap-4">
        {/* Left: Mute/Unmute button */}
        <Pressable
          onPress={onToggleMute}
          className="w-14 h-14 rounded-full items-center justify-center shadow-lg"
          style={{
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        >
          <IconSymbol
            name={isMuted ? 'mic.slash.fill' : 'mic.fill'}
            size={24}
            color={isMuted ? '#ef4444' : '#000'}
          />
        </Pressable>

        {/* Center: Stop button (larger, red) */}
        <Pressable
          onPress={onEnd}
          className="w-16 h-16 rounded-full items-center justify-center shadow-lg"
          style={{
            backgroundColor: '#ef4444',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        >
          <IconSymbol name="phone.down.fill" size={32} color="white" />
        </Pressable>

        {/* Right: Speaker button (placeholder for output control) */}
        <Pressable
          className="w-14 h-14 rounded-full items-center justify-center shadow-lg"
          style={{
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        >
          <IconSymbol name="speaker.wave.2.fill" size={24} color="#000" />
        </Pressable>
      </View>
    );
  }

  return null;
}
