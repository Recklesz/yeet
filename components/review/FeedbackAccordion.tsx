import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionIcon,
  AccordionContent,
  Box,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { FeedbackItem } from '@/constants/review';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ChevronDownIcon } from '@gluestack-ui/themed';

interface FeedbackAccordionProps {
  wins: FeedbackItem[];
  opportunities: FeedbackItem[];
}

export function FeedbackAccordion({ wins, opportunities }: FeedbackAccordionProps) {
  const colorScheme = useColorScheme();

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

  return (
    <Accordion type="multiple" defaultValue={['wins', 'opportunities']} width="100%">
      {/* Wins Section */}
      {wins.length > 0 && (
        <AccordionItem
          value="wins"
          backgroundColor={colorScheme === 'dark' ? '$gray900' : '$gray50'}
          borderRadius="$lg"
          marginBottom={12}
          borderWidth={1}
          borderColor={colorScheme === 'dark' ? '$gray800' : '$gray200'}
        >
          <AccordionHeader>
            <AccordionTrigger paddingVertical={16} paddingHorizontal={16}>
              {({ isExpanded }: { isExpanded: boolean }) => (
                <>
                  <AccordionTitleText
                    fontSize={20}
                    fontWeight="$bold"
                    color={colorScheme === 'dark' ? '$white' : '$black'}
                  >
                    🎉 What Went Well ({wins.length})
                  </AccordionTitleText>
                  <AccordionIcon
                    as={ChevronDownIcon}
                    color={colorScheme === 'dark' ? '$gray400' : '$gray600'}
                    marginLeft={12}
                  />
                </>
              )}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent paddingHorizontal={16} paddingBottom={16}>
            <VStack gap="$sm">{wins.map(renderFeedbackItem)}</VStack>
          </AccordionContent>
        </AccordionItem>
      )}

      {/* Opportunities Section */}
      {opportunities.length > 0 && (
        <AccordionItem
          value="opportunities"
          backgroundColor={colorScheme === 'dark' ? '$gray900' : '$gray50'}
          borderRadius="$lg"
          borderWidth={1}
          borderColor={colorScheme === 'dark' ? '$gray800' : '$gray200'}
        >
          <AccordionHeader>
            <AccordionTrigger paddingVertical={16} paddingHorizontal={16}>
              {({ isExpanded }: { isExpanded: boolean }) => (
                <>
                  <AccordionTitleText
                    fontSize={20}
                    fontWeight="$bold"
                    color={colorScheme === 'dark' ? '$white' : '$black'}
                  >
                    💡 Areas to Improve ({opportunities.length})
                  </AccordionTitleText>
                  <AccordionIcon
                    as={ChevronDownIcon}
                    color={colorScheme === 'dark' ? '$gray400' : '$gray600'}
                    marginLeft={12}
                  />
                </>
              )}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent paddingHorizontal={16} paddingBottom={16}>
            <VStack gap="$sm">{opportunities.map(renderFeedbackItem)}</VStack>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
}
