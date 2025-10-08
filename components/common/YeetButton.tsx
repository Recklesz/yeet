import React from 'react';
import { ActivityIndicator, Pressable, PressableProps } from 'react-native';
import { Text } from '@gluestack-ui/themed';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type YeetButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type YeetButtonSize = 'sm' | 'md' | 'lg';

export interface YeetButtonProps extends Omit<PressableProps, 'children'> {
  /** Button variant - primary (filled), secondary (outlined), tertiary (text only) */
  variant?: YeetButtonVariant;
  /** Button size */
  size?: YeetButtonSize;
  /** Button text */
  children: string;
  /** Whether button is in loading state */
  loading?: boolean;
  /** Whether button should take full width */
  fullWidth?: boolean;
  /** Optional icon component to display before text */
  icon?: React.ReactNode;
  /** Custom className for additional styling */
  className?: string;
}

/**
 * YeetButton - Modern, reusable button component
 *
 * Features:
 * - Three variants: primary, secondary, tertiary
 * - Three sizes: sm, md, lg
 * - Loading state with spinner
 * - Press animation with scale feedback
 * - Full accessibility support
 * - NativeWind/Tailwind styling
 */
export function YeetButton({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  fullWidth = true,
  icon,
  disabled,
  className = '',
  onPress,
  ...pressableProps
}: YeetButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'py-2 px-3 min-h-[40px]',
      text: 'text-sm',
    },
    md: {
      container: 'py-3 px-4 min-h-[48px]',
      text: 'text-base',
    },
    lg: {
      container: 'py-4 px-5 min-h-[56px]',
      text: 'text-lg',
    },
  };

  // Variant configurations
  const variantConfig = {
    primary: {
      container: 'bg-primary-900 shadow-lg shadow-black/10 active:bg-primary-800',
      text: 'text-typography-white',
      disabled: 'bg-primary-300',
    },
    secondary: {
      container: 'bg-white border-2 border-primary-400 active:bg-primary-50',
      text: 'text-primary-400',
      disabled: 'bg-background-100 border-outline-300',
    },
    tertiary: {
      container: 'bg-transparent active:bg-primary-50',
      text: 'text-primary-400',
      disabled: 'bg-transparent',
    },
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  const containerClasses = [
    'rounded-full',
    'flex-row',
    'items-center',
    'justify-center',
    'gap-2',
    currentSize.container,
    currentVariant.container,
    fullWidth ? 'w-full' : '',
    disabled || loading ? currentVariant.disabled : '',
    disabled || loading ? 'opacity-60' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const textClasses = [
    'font-semibold',
    'text-center',
    currentSize.text,
    currentVariant.text,
    disabled || loading ? 'text-typography-400' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const isDisabled = disabled || loading;

  return (
    <AnimatedPressable
      className={containerClasses}
      disabled={isDisabled}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
      accessibilityRole="button"
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
      accessibilityLabel={children}
      {...pressableProps}
    >
      {loading && (
        <ActivityIndicator size="small" color={variant === 'primary' ? '#FFFFFF' : '#6366F1'} />
      )}
      {!loading && icon && icon}
      <Text className={textClasses}>{children}</Text>
    </AnimatedPressable>
  );
}
