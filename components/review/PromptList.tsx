import { IconSymbol } from '@/components/ui/icon-symbol';
import type { SuggestedPrompt } from '@/constants/review';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Box, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';

interface PromptListProps {
  prompts: SuggestedPrompt[];
  onPromptPress?: (scenarioId: string) => void;
}

export function PromptList({ prompts, onPromptPress }: PromptListProps) {
  const colorScheme = useColorScheme();

  return (
    <VStack gap="$md">
      <Text fontSize={20} fontWeight="$bold" color={colorScheme === 'dark' ? '$white' : '$black'}>
        🎯 Suggested Next Steps
      </Text>

      <VStack gap="$sm">
        {prompts.map(prompt => (
          <Pressable key={prompt.id} onPress={() => onPromptPress?.(prompt.scenarioId)}>
            <Box
              backgroundColor={colorScheme === 'dark' ? '$gray900' : '$gray50'}
              borderRadius="$lg"
              padding={16}
              borderWidth={1}
              borderColor={colorScheme === 'dark' ? '$gray800' : '$gray200'}
            >
              <HStack justifyContent="space-between" alignItems="center">
                <VStack flex={1} gap="$xs">
                  <Text
                    fontSize={16}
                    fontWeight="$semibold"
                    color={colorScheme === 'dark' ? '$white' : '$black'}
                  >
                    {prompt.title}
                  </Text>
                  <Text fontSize={13} color={colorScheme === 'dark' ? '$gray400' : '$gray600'}>
                    {prompt.description}
                  </Text>
                </VStack>

                <IconSymbol
                  name="chevron.right"
                  size={20}
                  color={colorScheme === 'dark' ? '#9CA3AF' : '#6B7280'}
                />
              </HStack>
            </Box>
          </Pressable>
        ))}
      </VStack>
    </VStack>
  );
}
