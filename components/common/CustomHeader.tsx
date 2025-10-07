import { Feather } from '@expo/vector-icons';
import {
  Box,
  HStack,
  Input,
  InputField,
  InputSlot,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/use-color-scheme';

export type CustomHeaderVariant = 'general' | 'search';

type CustomHeaderProps = {
  title: string;
  subtitle?: string;
  highlightLabel?: string;
  highlightValue?: string;
  variant?: CustomHeaderVariant;
  searchPlaceholder?: string;
  onMicPress?: () => void;
};

export function CustomHeader({
  title,
  subtitle,
  highlightLabel,
  highlightValue,
  variant = 'general',
  searchPlaceholder = 'Search',
  onMicPress,
}: CustomHeaderProps) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#1E1743' : '#7C5CFF';

  return (
    <Box className="rounded-b-3xl" style={{ paddingTop: insets.top, backgroundColor }}>
      <Box className="px-5 pb-6 pt-10" style={{ backgroundColor }}>
        <VStack className="gap-2">
          <Text className="text-3xl font-bold text-white">{title}</Text>
          {subtitle ? <Text className="text-lg text-white/80">{subtitle}</Text> : null}
        </VStack>

        {highlightLabel && highlightValue ? (
          <Box className="bg-white/15 rounded-2xl px-4 py-3 mt-5">
            <Text className="text-sm text-white/80">{highlightLabel}</Text>
            <Text className="text-2xl font-semibold text-white">{highlightValue}</Text>
          </Box>
        ) : null}

        {variant === 'search' ? (
          <HStack className="items-center gap-2 mt-6">
            <Input className="flex-1 bg-white/90 border-0 rounded-xl h-12">
              <InputSlot className="pl-3">
                <Feather name="search" size={20} color="#9CA3AF" />
              </InputSlot>
              <InputField
                placeholder={searchPlaceholder}
                className="text-typography-900 placeholder:text-typography-400"
              />
            </Input>

            {onMicPress ? (
              <Pressable className="bg-white/90 rounded-xl p-3" onPress={onMicPress}>
                <Feather name="mic" size={24} color="#9CA3AF" />
              </Pressable>
            ) : null}
          </HStack>
        ) : null}
      </Box>
    </Box>
  );
}

export default CustomHeader;
