import { Feather } from '@expo/vector-icons';
import { Box, HStack, Pressable, VStack } from '@gluestack-ui/themed';
import React, { ReactNode } from 'react';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
   * Icon to show on top-right (fades out on collapse)
   */
  topRightIcon?: keyof typeof Feather.glyphMap;

  /**
   * Callback for top-right icon press
   */
  onTopRightIconPress?: () => void;

  /**
   * Background gradient colors
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
  topRightIcon,
  onTopRightIconPress,
  backgroundColor,
}: AnimatedHeaderProps) {
  const insets = useSafeAreaInsets();
  const defaultBg = '#7C5CFF';

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
    marginTop: interpolate(height, [maxHeight, minHeight], [insets.top + 40, insets.top + 20]),
  }));

  return (
    <Box
      className="rounded-b-3xl overflow-hidden"
      style={{
        height,
        backgroundColor: backgroundColor || defaultBg,
      }}
    >
      <Animated.View
        style={[
          {
            flex: 1,
            paddingHorizontal: 20,
            paddingBottom: 20,
          },
          contentContainerStyle,
        ]}
      >
        {/* Top Row: Title/Subtitle + Optional Icon */}
        <HStack className="justify-between items-start">
          <VStack style={{ flex: 1, gap: 4 }}>
            <Animated.Text
              style={[
                {
                  color: '#FFFFFF',
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
                    color: 'rgba(255, 255, 255, 0.8)',
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
                <Feather name={topRightIcon} size={28} color="white" />
              </Pressable>
            </Animated.View>
          ) : null}
        </HStack>

        {/* Right Content Area (e.g., score, metric) */}
        {rightContent ? (
          <Animated.View
            style={[
              {
                position: 'absolute',
                right: 20,
                bottom: 20,
              },
              rightContentContainerStyle,
            ]}
          >
            {typeof rightContent === 'string' ? (
              <VStack className="items-end">
                <Animated.Text
                  style={[
                    {
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: 14,
                    },
                  ]}
                >
                  Score
                </Animated.Text>
                <Animated.Text
                  style={[
                    {
                      color: '#FFFFFF',
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
    </Box>
  );
}

export default AnimatedHeader;
