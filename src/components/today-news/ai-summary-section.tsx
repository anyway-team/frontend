import { Tooltip } from '../ui/tooltip';
import { Text } from '@radix-ui/themes';

interface AiSummarySectionProps {
  description: string;
}

export const AiSummarySection = ({ description }: AiSummarySectionProps) => {
  return (
    <>
      <Tooltip text={'AI가 요약했어요'} />
      <div style={{ margin: '12px 24px' }}>
        <Text>{description}</Text>
      </div>
    </>
  );
};
