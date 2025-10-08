import React, { ReactNode } from 'react';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandGradient } from '@/components/common/BrandGradient';
import { COLORS, HEADER_HEIGHTS } from '@/constants/ui-tokens';

export type ReviewHeaderProps = {
  /**
   * Animated height value
   * Should animate from maxHeight to minHeight
   */
  height: number;

  /**
   * Maximum height when fully expanded
   * @default HEADER_HEIGHTS.max (216)
   */
  maxHeight?: number;

  /**
   * Minimum height when fully collapsed
   * @default HEADER_HEIGHTS.min (180)
   */
  minHeight?: number;

  /**
   * Main title text
   */
  title: string;

  /**
   * Subtitle text (fades out on collapse)
   */
  subtitle?: string;

  /**
   * Metric content (e.g., CircularScoreGauge)
   * Positioned below title/subtitle
   */
  metricContent?: ReactNode;
};

/**
 * Animated header purpose-built for the review screen
 * Features brand gradient background and scroll-driven collapse
 */
export function ReviewHeader({
  height,
  maxHeight = HEADER_HEIGHTS.max,
  minHeight = HEADER_HEIGHTS.min,
  title,
  subtitle,
  metricContent,
}: ReviewHeaderProps) {
  const insets = useSafeAreaInsets();

  // Softer text colors for gradient background
  const textColor = COLORS.typography[700];
  const subtitleColor = COLORS.typography[600];

  // Centralized animation: compute title fontSize and opacity
  const titleStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(height, [maxHeight, minHeight], [28, 20]),
  }));

  // Centralized animation: compute subtitle fontSize and opacity
  const subtitleStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(height, [maxHeight, minHeight], [16, 12]),
    opacity: interpolate(height, [maxHeight, minHeight], [1, 0], 'clamp'),
  }));

  // Metric content scale and opacity
  const metricStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(height, [maxHeight, minHeight], [1, 0.8]),
      },
    ],
    opacity: interpolate(height, [maxHeight, minHeight + 20], [1, 0.6], 'clamp'),
  }));

  // Content container with safe area inset
  const contentContainerStyle = useAnimatedStyle(() => ({
    marginTop: insets.top,
  }));

  return (
    <BrandGradient className="rounded-b-3xl" style={{ height }}>
      <Animated.View style={contentContainerStyle} className="flex-1 px-5 pb-2">
        {/* Title and Subtitle */}
        {(title || subtitle) && (
          <Animated.View className="gap-0">
            {title ? (
              <Animated.Text
                className="font-bold"
                style={[
                  {
                    color: textColor,
                  },
                  titleStyle,
                ]}
              >
                {title}
              </Animated.Text>
            ) : null}

            {subtitle ? (
              <Animated.Text
                style={[
                  {
                    color: subtitleColor,
                  },
                  subtitleStyle,
                ]}
              >
                {subtitle}
              </Animated.Text>
            ) : null}
          </Animated.View>
        )}

        {/* Metric Content (e.g., CircularScoreGauge) */}
        {metricContent ? (
          <Animated.View style={metricStyle} className="flex-1 items-center justify-center">
            {metricContent}
          </Animated.View>
        ) : null}
      </Animated.View>
    </BrandGradient>
  );
}

export default ReviewHeader;
