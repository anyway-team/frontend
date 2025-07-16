'use client';
import { useParams, useRouter } from 'next/navigation';
import { Chart } from '@/components/today-news-detail/chart';
import { useTab } from '@/components/today-news-detail/tabs';
import { AiSummarySection } from '@/components/today-news/ai-summary-section';
import { Button } from '@/components/ui/button';
import { NavigateBar } from '@/components/ui/navigate-bar';
import { ReactionSection } from '@/components/today-news/reaction-section';
import { Tooltip } from '@/components/ui/tooltip';
import { Text } from '@radix-ui/themes';
import Image from 'next/image';
import { Spacing } from '@/components/ui/spacing';
import { useNewsDetail } from '@/hooks/useNewsDetail';
import { NewsSection } from '@/components/common/news-section';
import { formatDateTime } from '@/utils/datetime';
import { toast } from 'sonner';

export default function NewsDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: newsDetail, isLoading, error } = useNewsDetail(id as string);
  const { tab } = useTab();

  const handleShare = () => {
    if (!newsDetail) return;
    const url = newsDetail.origin_url;
    navigator.clipboard.writeText(url);
    toast.success('원본 뉴스 기사의 URL이 복사되었습니다.');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !newsDetail) {
    return <div>Error: 뉴스를 불러올 수 없습니다.</div>;
  }

  const tabContent = () => {
    switch (tab) {
      case 'political':
        return (
          <>
            <Tooltip text="AI가 분석한 정치성향" />
            {newsDetail.bias_score && (
              <Chart
                progressive={newsDetail.bias_score.progressive}
                conservative={newsDetail.bias_score.conservative}
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
              alt="뒤로 가기"
              width={24}
              height={24}
              onClick={() => router.back()}
            />
          </Button>
        }
        right={
          <Button variant="ghost" onClick={handleShare}>
            <Image src="/share.png" alt="공유하기" width={22} height={22} />
          </Button>
        }
      />
      <Spacing size={56} />
      <NewsSection
        title={newsDetail.title}
        source={newsDetail.source}
        time={formatDateTime(newsDetail.published_at)}
        content={tabContent()}
        thumbnail={newsDetail.thumbnail_url || ''}
      />
    </>
  );
}
