import { IconSymbol } from '@/components/ui/icon-symbol';
import type { FeedbackItem } from '@/constants/review';
import { Box, HStack, Text, VStack } from '@gluestack-ui/themed';
import cx from 'clsx';

interface FeedbackAccordionProps {
  opportunities?: FeedbackItem[] | null;
  title?: string;
}

export function FeedbackAccordion({
  opportunities,
  title = '💡 Areas to Improve',
}: FeedbackAccordionProps) {
  const safeOpportunities = Array.isArray(opportunities) ? opportunities : [];

  const renderFeedbackItem = (item: FeedbackItem) => {
    const isWin = item.type === 'win';
    const bgColor = isWin
      ? '$green50'
      : '$amber50';
    const borderColor = isWin ? '$green500' : '$amber500';

    return (
      <Box
        key={item.id}
        className="rounded-2xl border p-4"
        backgroundColor={bgColor}
        borderColor={borderColor}
      >
        <HStack alignItems="flex-start" className="gap-3">
          <Box backgroundColor={borderColor} borderRadius="$full" padding={8} marginTop={2}>
            <IconSymbol name={item.icon as any} size={16} color="white" />
          </Box>

          <VStack flex={1} className="gap-1.5">
            <Text
              className={cx(
                'text-base font-bold',
                'text-black'
              )}
            >
              {item.title}
            </Text>
            <Text
              className={cx('text-sm', 'text-gray-700')}
            >
              {item.description}
            </Text>
          </VStack>
        </HStack>
      </Box>
    );
  };

  return (
    <VStack className="gap-3">
      <Text
        className={cx('text-xl font-bold', 'text-black')}
      >
        {title}
      </Text>

      {safeOpportunities.length > 0 ? (
        <VStack className="gap-3">{safeOpportunities.map(renderFeedbackItem)}</VStack>
      ) : (
        <Box
          className="rounded-2xl border p-4"
          backgroundColor='$gray50'
          borderColor='$gray200'
        >
          <Text
            className={cx('text-sm', 'text-gray-600')}
          >
            No coaching notes this time. We'll surface opportunities to grow once we have them.
          </Text>
        </Box>
      )}
    </VStack>
  );
}
