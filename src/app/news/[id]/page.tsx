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
import { useNewsDetail, type NewsDetail } from '@/hooks/useNewsDetail';
import { NewsSection } from '@/components/common/news-section';
import { formatDateTime } from '@/utils/datetime';
import { toast } from 'sonner';
import { useNewsPick } from '@/hooks/useNewsPick';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function NewsDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const {
    data: newsDetail,
    isLoading,
    error,
  } = useNewsDetail(id as string) as {
    data: NewsDetail | undefined;
    isLoading: boolean;
    error: Error | null;
  };
  const { tab } = useTab();
  const { isAuthenticated } = useAuth();
  const { togglePick, isNewsPicked, isLoading: pickLoading, syncSingleNewsPick } = useNewsPick();

  const newsId = id as string;

  // 로컬 상태를 우선 사용하여 즉시 UI 업데이트 반영
  const localIsPicked = isNewsPicked(newsId);
  const isPicked = localIsPicked;

  // 뉴스 상세 데이터가 로드되면 찜 상태 동기화 (초기 로드 시에만)
  useEffect(() => {
    if (newsDetail && isAuthenticated && newsDetail.is_pick !== undefined) {
      // 서버에서 받은 찜 상태로 로컬 상태 동기화 (초기 설정)
      syncSingleNewsPick(newsId, newsDetail.is_pick);
    }
  }, [newsDetail?.id, isAuthenticated, newsDetail, syncSingleNewsPick, newsId]); // newsDetail.id가 변경될 때만 실행

  const handleShare = () => {
    if (!newsDetail) return;
    const url = newsDetail.origin_url;
    navigator.clipboard.writeText(url);
    toast.success('원본 뉴스 기사의 URL이 복사되었습니다.');
  };

  const handleTogglePick = async () => {
    if (!isAuthenticated) {
      toast.error('로그인이 필요한 서비스입니다.');
      return;
    }

    // 현재 찜 상태를 저장 (토글 전 상태)
    const wasPickedBefore = isPicked;

    const success = await togglePick(newsId);
    if (success) {
      // 토글 후 상태에 따라 메시지 표시
      if (wasPickedBefore) {
        toast.success('찜 목록에서 제거되었습니다.');
      } else {
        toast.success('찜 목록에 추가되었습니다.');
      }
    } else {
      toast.error('잠시 후 다시 시도해주세요.');
    }
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
        return <AiSummarySection description={newsDetail.summary.join(' ')} />;
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
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              variant="ghost"
              onClick={handleTogglePick}
              disabled={pickLoading}
              style={{
                opacity: pickLoading ? 0.6 : 1,
                cursor: pickLoading ? 'not-allowed' : 'pointer',
                transform: pickLoading ? 'scale(0.95)' : 'scale(1)',
                transition: 'all 0.2s ease',
              }}
            >
              <span
                style={{
                  fontSize: '22px',
                  filter: pickLoading ? 'grayscale(0.5)' : 'none',
                  transition: 'filter 0.2s ease',
                }}
              >
                {pickLoading ? '⏳' : isPicked ? '❤️' : '🤍'}
              </span>
            </Button>
            <Button variant="ghost" onClick={handleShare}>
              <Image src="/share.png" alt="공유하기" width={22} height={22} />
            </Button>
          </div>
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
