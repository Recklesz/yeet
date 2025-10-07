import { IconSymbol } from '@/components/ui/icon-symbol';
import type { SuggestedPrompt } from '@/constants/review';
import { Box, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';

interface PromptListProps {
  prompts: SuggestedPrompt[];
  onPromptPress?: (scenarioId: string) => void;
}

export function PromptList({ prompts, onPromptPress }: PromptListProps) {
  return (
    <VStack gap="$md">
      <Text fontSize={20} fontWeight="$bold" color="$black">
        🎯 Suggested Next Steps
      </Text>

      <VStack gap="$sm">
        {prompts.map(prompt => (
          <Pressable key={prompt.id} onPress={() => onPromptPress?.(prompt.scenarioId)}>
            <Box
              backgroundColor="$gray50"
              borderRadius="$lg"
              padding={16}
              borderWidth={1}
              borderColor="$gray200"
            >
              <HStack justifyContent="space-between" alignItems="center">
                <VStack flex={1} gap="$xs">
                  <Text fontSize={16} fontWeight="$semibold" color="$black">
                    {prompt.title}
                  </Text>
                  <Text fontSize={13} color="$gray600">
                    {prompt.description}
                  </Text>
                </VStack>

                <IconSymbol name="chevron.right" size={20} color="#6B7280" />
              </HStack>
            </Box>
          </Pressable>
        ))}
      </VStack>
    </VStack>
  );
}
