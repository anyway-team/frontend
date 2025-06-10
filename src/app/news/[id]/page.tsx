'use client';
import { useParams } from 'next/navigation';
import { useNewsDetail } from '@/hooks/useNewsDetail';
import { NavigateBar } from '@/components/ui/navigate-bar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Spacing } from '@/components/ui/spacing';
import { NewsSection } from '@/components/common/news-section';
import { useTab } from '@/components/today-news-detail/tabs';
import { Chart } from '@/components/today-news-detail/chart';
import { Tooltip } from '@/components/ui/tooltip';
import { Text } from '@radix-ui/themes';
import { AiSummarySection } from '@/components/today-news/ai-summary-section';
import { ReactionSection } from '@/components/today-news/reaction-section';

export default function NewsDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: newsDetail, isLoading } = useNewsDetail(id as string);
  const { tab } = useTab();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!newsDetail) {
    return <div>News not found</div>;
  }

  const tabContent = () => {
    switch (tab) {
      case 'political':
        return (
          <>
            <Tooltip text="AI가 분석한 정치성향" />
            {newsDetail.bias_score && (
              <Chart
                진보={newsDetail.bias_score.progressive}
                보수={newsDetail.bias_score.conservative}
              />
            )}
            <div style={{ margin: '12px 24px' }}>
              {newsDetail.bias_score && <Text>{newsDetail.bias_score.reason}</Text>}
            </div>
          </>
        );
      case 'ai-summary':
        return <AiSummarySection description={newsDetail.summary} />;
      case 'reaction':
        return (
          <ReactionSection
            items={[
              {
                isPositive: true,
                description: newsDetail.good_comment,
              },
              {
                isPositive: false,
                description: newsDetail.bad_comment,
              },
            ]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <NavigateBar
        left={
          <Button variant="ghost">
            <Image
              src="/back.png"
              alt="back"
              width={24}
              height={24}
              onClick={() => router.back()}
            />
          </Button>
        }
        right={
          <Button variant="ghost">
            <Image src="/share.png" alt="share" width={22} height={22} />
          </Button>
        }
      />
      <Spacing size={56} />
      <NewsSection
        title={newsDetail.title}
        source={newsDetail.source}
        time={newsDetail.published_at}
        content={tabContent()}
        thumbnail="/sample.jpg"
      />
    </>
  );
}
