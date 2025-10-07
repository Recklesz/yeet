import { IconSymbol } from '@/components/ui/icon-symbol';
import type { FeedbackItem } from '@/constants/review';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Box, ChevronDownIcon, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';

interface FeedbackAccordionProps {
  wins: FeedbackItem[];
  opportunities: FeedbackItem[];
}

type SectionKey = 'wins' | 'opportunities';

export function FeedbackAccordion({ wins, opportunities }: FeedbackAccordionProps) {
  const colorScheme = useColorScheme();

  const [openSections, setOpenSections] = React.useState<SectionKey[]>(() => {
    const initial: SectionKey[] = [];
    if (wins.length) initial.push('wins');
    if (opportunities.length) initial.push('opportunities');
    return initial;
  });

  const toggleSection = (section: SectionKey) => {
    setOpenSections(prev =>
      prev.includes(section) ? prev.filter(key => key !== section) : [...prev, section]
    );
  };

  const renderFeedbackItem = (item: FeedbackItem) => {
    const isWin = item.type === 'win';
    const bgColor = isWin
      ? colorScheme === 'dark'
        ? '$green950'
        : '$green50'
      : colorScheme === 'dark'
        ? '$amber950'
        : '$amber50';
    const borderColor = isWin ? '$green500' : '$amber500';

    return (
      <Box
        key={item.id}
        backgroundColor={bgColor}
        borderRadius="$lg"
        padding={16}
        borderWidth={1}
        borderColor={borderColor}
        marginBottom={8}
      >
        <HStack gap="$md" alignItems="flex-start">
          <Box backgroundColor={borderColor} borderRadius="$full" padding={8} marginTop={2}>
            <IconSymbol name={item.icon as any} size={16} color="white" />
          </Box>

          <VStack flex={1} gap="$xs">
            <Text
              fontSize={16}
              fontWeight="$bold"
              color={colorScheme === 'dark' ? '$white' : '$black'}
            >
              {item.title}
            </Text>
            <Text fontSize={14} color={colorScheme === 'dark' ? '$gray300' : '$gray700'}>
              {item.description}
            </Text>
          </VStack>
        </HStack>
      </Box>
    );
  };

  const renderSection = (section: SectionKey, title: string, items: FeedbackItem[]) => {
    if (items.length === 0) return null;

    const isOpen = openSections.includes(section);

    return (
      <Box
        key={section}
        backgroundColor={colorScheme === 'dark' ? '$gray900' : '$gray50'}
        borderRadius="$lg"
        borderWidth={1}
        borderColor={colorScheme === 'dark' ? '$gray800' : '$gray200'}
      >
        <Pressable
          onPress={() => toggleSection(section)}
          accessibilityRole="button"
          accessibilityState={{ expanded: isOpen }}
          paddingHorizontal={16}
          paddingVertical={16}
        >
          <HStack alignItems="center" justifyContent="space-between">
            <Text
              fontSize={20}
              fontWeight="$bold"
              color={colorScheme === 'dark' ? '$white' : '$black'}
            >
              {title}
            </Text>
            <ChevronDownIcon
              color={colorScheme === 'dark' ? '$gray400' : '$gray600'}
              style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
            />
          </HStack>
        </Pressable>

        {isOpen && (
          <VStack gap="$sm" paddingHorizontal={16} paddingBottom={16}>
            {items.map(renderFeedbackItem)}
          </VStack>
        )}
      </Box>
    );
  };

  return (
    <VStack gap="$md">
      {renderSection('wins', `🎉 What Went Well (${wins.length})`, wins)}
      {renderSection(
        'opportunities',
        `💡 Areas to Improve (${opportunities.length})`,
        opportunities
      )}
    </VStack>
  );
}
