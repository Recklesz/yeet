import { Text, VStack } from '@gluestack-ui/themed';
import cx from 'clsx';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withSpring } from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularScoreGaugeProps {
  score: number;
  max?: number;
  label?: string;
  sentiment: 'excellent' | 'great' | 'good' | 'needs-work';
  animate?: boolean;
  showSentimentText?: boolean;
}

export function CircularScoreGauge({
  score,
  max = 100,
  label = 'Out of 100',
  sentiment,
  animate = true,
  showSentimentText = false,
}: CircularScoreGaugeProps) {
  const size = 160;
  const strokeWidth = 12;
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
    switch (sentiment) {
      case 'excellent':
        return '#16a34a'; // green-600
      case 'great':
        return '#22c55e'; // green-500
      case 'good':
        return '#3b82f6'; // blue-500
      case 'needs-work':
        return '#f59e0b'; // amber-500
      default:
        return '#6b7280'; // gray-500
    }
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

  return (
    <VStack className="items-center gap-2">
      <View style={{ width: size, height: size, position: 'relative' }}>
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
            stroke="rgba(255, 255, 255, 0.2)"
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
        <VStack
          className="items-center justify-center gap-0"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Text className={cx('text-5xl font-bold', 'text-white')}>{score}</Text>
          <Text className={cx('text-sm font-medium', 'text-white/80')}>{label}</Text>
        </VStack>
      </View>

      {showSentimentText && (
        <Text className={cx('text-lg font-semibold', 'text-white')}>{getSentimentText()}</Text>
      )}
    </VStack>
  );
}
