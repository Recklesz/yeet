import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import React from 'react';

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
};

/**
 * Consistent brand gradient that reads the shared CSS variable tokens.
 *
 * Use Tailwind/NativeWind classes on the wrapper View to control layout and border radii.
 */
export function BrandGradient({
  colors = DEFAULT_COLORS,
  start = DEFAULT_START,
  end = DEFAULT_END,
  ...props
}: BrandGradientProps) {
  return <LinearGradient colors={colors} start={start} end={end} {...props} />;
}
