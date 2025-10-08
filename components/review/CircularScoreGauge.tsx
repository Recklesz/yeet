import { Text, VStack } from '@gluestack-ui/themed';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

import { designPalette, rgbToRgba } from '@/constants/design-palette';
import { COLORS, GAUGE_SIZES, SENTIMENT_COLORS, SENTIMENT_COLORS_SOFT } from '@/constants/ui-tokens';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularScoreGaugeProps {
  score: number;
  max?: number;
  label?: string;
  sentiment: 'excellent' | 'great' | 'good' | 'needs-work';
  animate?: boolean;
  showSentimentText?: boolean;
  variant?: 'light' | 'dark'; // 'light' for light backgrounds, 'dark' for dark backgrounds
}

export function CircularScoreGauge({
  score,
  max = 100,
  label = 'Out of 100',
  sentiment,
  animate = true,
  showSentimentText = false,
  variant = 'dark',
}: CircularScoreGaugeProps) {
  const size = GAUGE_SIZES.default;
  const strokeWidth = GAUGE_SIZES.strokeWidth;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = useSharedValue(0);

  useEffect(() => {
    if (animate) {
      progress.value = withSpring(score / max, {
        damping: 15,
        stiffness: 80,
      });
    } else {
      progress.value = score / max;
    }
  }, [score, max, animate, progress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - progress.value);
    return {
      strokeDashoffset,
    };
  });

  const getSentimentColor = () => {
    const colorMap = variant === 'light' ? SENTIMENT_COLORS_SOFT : SENTIMENT_COLORS;
    return colorMap[sentiment] || COLORS.typography[500];
  };

  const getSentimentText = () => {
    switch (sentiment) {
      case 'excellent':
        return 'Excellent!';
      case 'great':
        return 'Great Effort!';
      case 'good':
        return 'Good Work';
      case 'needs-work':
        return 'Keep Practicing';
      default:
        return 'Complete';
    }
  };

  const ringColor = getSentimentColor();

  // Determine colors based on variant
  const bgCircleColor = variant === 'light' ? COLORS.typography[200] : COLORS.white[20];
  const textColor = variant === 'light' ? COLORS.typography[700] : COLORS.white.solid;
  const labelColor =
    variant === 'light' ? COLORS.typography[600] : rgbToRgba(designPalette.typography[0]!, 0.8);
  const sentimentTextColor = variant === 'light' ? COLORS.typography[700] : COLORS.white.solid;

  return (
    <VStack className="items-center gap-2">
      <View className="relative" style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <Defs>
            <LinearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={ringColor} stopOpacity="1" />
              <Stop offset="100%" stopColor={ringColor} stopOpacity="0.8" />
            </LinearGradient>
          </Defs>

          {/* Background circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={bgCircleColor}
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Progress circle */}
          <AnimatedCircle
            cx={center}
            cy={center}
            r={radius}
            stroke="url(#ringGradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            transform={`rotate(-90 ${center} ${center})`}
            animatedProps={animatedProps}
          />
        </Svg>

        {/* Centered text */}
        <VStack className="absolute inset-0 items-center justify-center gap-0">
          <Text className="text-5xl font-bold" style={{ color: textColor }}>
            {score}
          </Text>
          <Text className="text-sm font-medium" style={{ color: labelColor }}>
            {label}
          </Text>
        </VStack>
      </View>

      {showSentimentText && (
        <Text className="text-lg font-semibold" style={{ color: sentimentTextColor }}>
          {getSentimentText()}
        </Text>
      )}
    </VStack>
  );
}
