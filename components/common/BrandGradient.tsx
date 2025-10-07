import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import React from 'react';
import { View } from 'react-native';

const DEFAULT_COLORS = [
  'rgb(var(--gradient-brand-from) / 1)',
  'rgb(var(--gradient-brand-via) / 1)',
  'rgb(var(--gradient-brand-to) / 1)',
] as const;

const DEFAULT_START: LinearGradientProps['start'] = { x: 0, y: 0.5 };
const DEFAULT_END: LinearGradientProps['end'] = { x: 1, y: 0.5 };

export type BrandGradientProps = Omit<LinearGradientProps, 'colors' | 'start' | 'end'> & {
  colors?: LinearGradientProps['colors'];
  start?: LinearGradientProps['start'];
  end?: LinearGradientProps['end'];
  className?: string;
  children?: React.ReactNode;
};

/**
 * Consistent brand gradient that supports Tailwind/NativeWind classes.
 *
 * Use className for border radius, padding, and other styles.
 */
export function BrandGradient({
  colors = DEFAULT_COLORS,
  start = DEFAULT_START,
  end = DEFAULT_END,
  className,
  children,
  style,
  ...props
}: BrandGradientProps) {
  return (
    <View className={className} style={{ overflow: 'hidden' }}>
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={[{ flex: 1 }, style]}
        {...props}
      >
        {children}
      </LinearGradient>
    </View>
  );
}
