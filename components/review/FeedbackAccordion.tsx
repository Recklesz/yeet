import { IconSymbol } from '@/components/ui/icon-symbol';
import type { FeedbackItem } from '@/constants/review';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Box, ChevronDownIcon, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';
import clsx from 'clsx';
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
        className="mb-2 rounded-2xl border p-4"
        backgroundColor={bgColor}
        borderColor={borderColor}
      >
        <HStack gap="$md" alignItems="flex-start">
          <Box backgroundColor={borderColor} borderRadius="$full" padding={8} marginTop={2}>
            <IconSymbol name={item.icon as any} size={16} color="white" />
          </Box>

          <VStack flex={1} gap="$xs">
            <Text
              className={clsx(
                'text-base font-bold',
                colorScheme === 'dark' ? 'text-white' : 'text-black'
              )}
            >
              {item.title}
            </Text>
            <Text
              className={clsx(
                'text-sm',
                colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              )}
            >
              {item.description}
            </Text>
          </VStack>
        </HStack>
      </Box>
    );
  };

  const renderSection = (
    section: SectionKey,
    title: string,
    items: FeedbackItem[],
    emptyMessage: string
  ) => {
    const hasItems = items.length > 0;
    const isOpen = hasItems ? openSections.includes(section) : true;

    return (
      <Box
        key={section}
        backgroundColor={colorScheme === 'dark' ? '$gray900' : '$gray50'}
        borderRadius="$lg"
        borderWidth={1}
        borderColor={colorScheme === 'dark' ? '$gray800' : '$gray200'}
      >
        <Pressable
          disabled={!hasItems}
          onPress={hasItems ? () => toggleSection(section) : undefined}
          accessibilityRole="button"
          accessibilityState={{ expanded: hasItems ? isOpen : undefined, disabled: !hasItems }}
          paddingHorizontal={16}
          paddingVertical={16}
          className={clsx(!hasItems && 'opacity-60')}
        >
          <HStack alignItems="center" justifyContent="space-between">
            <Text
              fontSize={20}
              fontWeight="$bold"
              color={colorScheme === 'dark' ? '$white' : '$black'}
            >
              {title}
            </Text>
            {hasItems && (
              <ChevronDownIcon
                color={colorScheme === 'dark' ? '$gray400' : '$gray600'}
                style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
              />
            )}
          </HStack>
        </Pressable>

        {(isOpen || !hasItems) && (
          <VStack gap="$sm" paddingHorizontal={16} paddingBottom={16}>
            {hasItems ? (
              items.map(renderFeedbackItem)
            ) : (
              <Text fontSize={14} color={colorScheme === 'dark' ? '$gray400' : '$gray600'}>
                {emptyMessage}
              </Text>
            )}
          </VStack>
        )}
      </Box>
    );
  };

  return (
    <VStack gap="$md">
      {renderSection(
        'wins',
        `🎉 What Went Well (${wins.length})`,
        wins,
        'No highlights captured yet. Keep practicing and we’ll celebrate the wins here.'
      )}
      {renderSection(
        'opportunities',
        `💡 Areas to Improve (${opportunities.length})`,
        opportunities,
        'No coaching notes this time. We’ll surface opportunities to grow once we have them.'
      )}
    </VStack>
  );
}
