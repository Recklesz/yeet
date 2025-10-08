import { IconSymbol } from '@/components/ui/icon-symbol';
import type { FeedbackItem } from '@/constants/review';
import { ICON_SIZES } from '@/constants/ui-tokens';
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
    const styles = isWin
      ? { bg: 'bg-green-50', border: 'border-green-500', icon: 'bg-green-500' }
      : { bg: 'bg-amber-50', border: 'border-amber-500', icon: 'bg-amber-500' };

    return (
      <Box key={item.id} className={cx('rounded-2xl border p-4', styles.bg, styles.border)}>
        <HStack className="items-start gap-3">
          <Box className={cx('mt-0.5 rounded-full p-2', styles.icon)}>
            <IconSymbol name={item.icon as any} size={ICON_SIZES.sm} color="white" />
          </Box>

          <VStack className="flex-1 gap-1.5">
            <Text className="text-base font-bold text-gray-900">{item.title}</Text>
            <Text className="text-sm leading-relaxed text-gray-700">{item.description}</Text>
          </VStack>
        </HStack>
      </Box>
    );
  };

  return (
    <VStack className="gap-3">
      <Text className={cx('text-xl font-bold', 'text-black')}>{title}</Text>

      {safeOpportunities.length > 0 ? (
        <VStack className="gap-3">{safeOpportunities.map(renderFeedbackItem)}</VStack>
      ) : (
        <Box className={cx('rounded-2xl border p-4', 'border-gray-200 bg-gray-50')}>
          <Text className={cx('text-sm', 'text-gray-600')}>
            No coaching notes this time. We&apos;ll surface opportunities to grow once we have them.
          </Text>
        </Box>
      )}
    </VStack>
  );
}
