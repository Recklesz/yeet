import { useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

type UseAnimatedHeaderOptions = {
  /**
   * Maximum header height when fully expanded
   * @default 300
   */
  maxHeight?: number;

  /**
   * Minimum header height when fully collapsed
   * @default 120
   */
  minHeight?: number;

  /**
   * Scroll position at which header starts collapsing
   * @default 0
   */
  scrollThreshold?: number;

  /**
   * Scroll distance over which header animates from max to min
   * @default 150
   */
  collapseDistance?: number;
};

/**
 * Hook to manage animated header state based on scroll position
 *
 * @example
 * const { height, headerStyle, handleScroll } = useAnimatedHeader({
 *   maxHeight: 300,
 *   minHeight: 120,
 * });
 *
 * return (
 *   <View>
 *     <Animated.View style={headerStyle}>
 *       <AnimatedHeader height={height} title="Review" />
 *     </Animated.View>
 *     <Animated.ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
 *       {content}
 *     </Animated.ScrollView>
 *   </View>
 * );
 */
export function useAnimatedHeader(options: UseAnimatedHeaderOptions = {}) {
  const { maxHeight = 300, minHeight = 120, scrollThreshold = 0, collapseDistance = 150 } = options;

  const scrollY = useSharedValue(0);
  const animatedHeight = useSharedValue(maxHeight);
  const [height, setHeight] = useState(maxHeight);

  /**
   * Update height state on the JS thread
   */
  const updateHeight = (value: number) => {
    'worklet';
    runOnJS(setHeight)(value);
  };

  /**
   * Animated style for the header container
   */
  const headerStyle = useAnimatedStyle(() => {
    updateHeight(animatedHeight.value);
    return {
      height: animatedHeight.value,
    };
  });

  /**
   * Handle scroll events and update header height
   */
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    'worklet';
    const y = event.nativeEvent.contentOffset.y;
    scrollY.value = y;

    // Calculate header height based on scroll position
    animatedHeight.value = interpolate(
      y,
      [scrollThreshold, scrollThreshold + collapseDistance],
      [maxHeight, minHeight],
      Extrapolation.CLAMP
    );
  };

  /**
   * Check if header is currently collapsed
   */
  const isCollapsed = useDerivedValue(() => animatedHeight.value <= minHeight + 10);

  return {
    /**
     * Current header height (state value for non-animated use)
     */
    height,

    /**
     * Animated height shared value
     */
    animatedHeight,

    /**
     * Scroll Y position shared value
     */
    scrollY,

    /**
     * Animated style object for header container
     */
    headerStyle,

    /**
     * Scroll event handler
     */
    handleScroll,

    /**
     * Whether header is collapsed
     */
    isCollapsed,
  };
}
