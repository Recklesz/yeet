import { Feather } from '@expo/vector-icons';
import { Box, HStack, Pressable, VStack } from '@gluestack-ui/themed';
import React, { ReactNode } from 'react';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandGradient } from '@/components/common/BrandGradient';
import { COLORS, ICON_SIZES } from '@/constants/ui-tokens';

type AnimatedHeaderProps = {
  /**
   * Animated height value (SharedValue from Reanimated)
   * Should animate from maxHeight to minHeight
   */
  height: number;

  /**
   * Maximum height when fully expanded
   * @default 300
   */
  maxHeight?: number;

  /**
   * Minimum height when fully collapsed
   * @default 120
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
   * Right-side content (e.g., score, metric)
   * Can be a string or custom component
   */
  rightContent?: ReactNode;

  /**
   * Center the content below the title
   */
  centerContent?: boolean;

  /**
   * Icon to show on top-right (fades out on collapse)
   */
  topRightIcon?: keyof typeof Feather.glyphMap;

  /**
   * Callback for top-right icon press
   */
  onTopRightIconPress?: () => void;

  /**
   * Background variant - 'solid' for single color, 'gradient' for brand gradient
   * @default 'solid'
   */
  backgroundVariant?: 'solid' | 'gradient';

  /**
   * Background color (only used when backgroundVariant is 'solid')
   * @default COLORS.background[950]
   */
  backgroundColor?: string;
};

export function AnimatedHeader({
  height,
  maxHeight = 300,
  minHeight = 120,
  title,
  subtitle,
  rightContent,
  centerContent = false,
  topRightIcon,
  onTopRightIconPress,
  backgroundVariant = 'solid',
  backgroundColor,
}: AnimatedHeaderProps) {
  const insets = useSafeAreaInsets();
  const defaultBg = COLORS.background[950];

  // Use softer text colors for gradient, white text for solid dark background
  const textColor = backgroundVariant === 'gradient' ? COLORS.typography[700] : COLORS.white.solid;
  const subtitleColor = backgroundVariant === 'gradient' ? COLORS.typography[600] : COLORS.white[80];
  const iconColor = backgroundVariant === 'gradient' ? COLORS.typography[700] : 'white';

  // Title font size animation
  const titleStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(height, [maxHeight, minHeight], [28, 20]),
  }));

  // Subtitle font size and opacity animation
  const subtitleStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(height, [maxHeight, minHeight], [16, 12]),
    opacity: interpolate(height, [maxHeight, minHeight], [1, 0], 'clamp'),
  }));

  // Top-right icon opacity animation (fades out)
  const topRightIconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(height, [maxHeight, minHeight + 40], [1, 0], 'clamp'),
  }));

  // Right content position and scale animation
  const rightContentContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(height, [maxHeight, minHeight], [1, 0.8]),
      },
    ],
    opacity: interpolate(height, [maxHeight, minHeight + 20], [1, 0.6], 'clamp'),
  }));

  // Content margin adjustment
  const contentContainerStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(height, [maxHeight, minHeight], [insets.top, insets.top]),
  }));

  const headerContent = (
    <Animated.View className="flex-1 px-5 pb-4" style={[contentContainerStyle]}>
      {/* Top Row: Title/Subtitle + Optional Icon */}
      <HStack className="justify-between items-start">
        <VStack style={{ flex: 1, gap: 4 }}>
          <Animated.Text
            style={[
              {
                color: textColor,
                fontWeight: '700',
              },
              titleStyle,
            ]}
          >
            {title}
          </Animated.Text>

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
        </VStack>

        {topRightIcon ? (
          <Animated.View style={topRightIconStyle}>
            <Pressable onPress={onTopRightIconPress}>
              <Feather name={topRightIcon} size={ICON_SIZES.xl} color={iconColor} />
            </Pressable>
          </Animated.View>
        ) : null}
      </HStack>

      {/* Content Area (e.g., score, metric) */}
      {rightContent ? (
        <Animated.View
          style={[
            {
              position: 'absolute',
              ...(centerContent
                ? {
                    left: 0,
                    right: 0,
                    bottom: 20,
                    alignItems: 'center',
                  }
                : {
                    right: 20,
                    bottom: 20,
                  }),
            },
            rightContentContainerStyle,
          ]}
        >
          {typeof rightContent === 'string' ? (
            <VStack className={centerContent ? 'items-center' : 'items-end'}>
              <Animated.Text
                style={[
                  {
                    color: subtitleColor,
                    fontSize: 14,
                  },
                ]}
              >
                Score
              </Animated.Text>
              <Animated.Text
                style={[
                  {
                    color: textColor,
                    fontSize: interpolate(height, [maxHeight, minHeight], [48, 28]),
                    fontWeight: '700',
                  },
                ]}
              >
                {rightContent}
              </Animated.Text>
            </VStack>
          ) : (
            rightContent
          )}
        </Animated.View>
      ) : null}
    </Animated.View>
  );

  return backgroundVariant === 'gradient' ? (
    <BrandGradient className="rounded-b-3xl" style={{ height }}>
      {headerContent}
    </BrandGradient>
  ) : (
    <Box
      className="rounded-b-3xl overflow-hidden"
      style={{
        height,
        backgroundColor: backgroundColor || defaultBg,
      }}
    >
      {headerContent}
    </Box>
  );
}

export default AnimatedHeader;
