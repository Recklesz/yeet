import React from 'react';
import { ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SafeAreaScreenProps = {
  children: React.ReactNode;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  style?: ViewStyle;
  className?: string;
};

/**
 * Consistent safe area wrapper for all screens.
 * Uses SafeAreaView from react-native-safe-area-context to avoid deprecation warnings.
 */
export function SafeAreaScreen({
  children,
  edges = ['top', 'bottom', 'left', 'right'],
  style,
  className,
}: SafeAreaScreenProps) {
  return (
    <SafeAreaView edges={edges} style={[{ flex: 1 }, style]} className={className}>
      {children}
    </SafeAreaView>
  );
}
