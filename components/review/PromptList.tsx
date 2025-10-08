import { IconSymbol } from '@/components/ui/icon-symbol';
import type { SuggestedPrompt } from '@/constants/review';
import { ICON_SIZES } from '@/constants/ui-tokens';
import { Box, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';
import cx from 'clsx';
import React from 'react';

interface PromptListProps {
  prompts: SuggestedPrompt[];
  onPromptPress?: (scenarioId: string) => void;
}

export function PromptList({ prompts, onPromptPress }: PromptListProps) {
  return (
    <VStack className="gap-4">
      <Text className={cx('text-xl font-bold', 'text-black')}>Suggested Next Steps</Text>

      <VStack className="gap-3">
        {prompts.map(prompt => (
          <Pressable key={prompt.id} onPress={() => onPromptPress?.(prompt.scenarioId)}>
            <Box className={cx('rounded-2xl p-4', 'bg-gray-50')}>
              <HStack className="items-center justify-between">
                <VStack className="flex-1 gap-1">
                  <Text className={cx('text-base font-semibold', 'text-black')}>
                    {prompt.title}
                  </Text>
                  <Text className={cx('text-sm', 'text-gray-600')}>{prompt.description}</Text>
                </VStack>

                <IconSymbol name="chevron.right" size={ICON_SIZES.md} color="#64748b" />
              </HStack>
            </Box>
          </Pressable>
        ))}
      </VStack>
    </VStack>
  );
}
