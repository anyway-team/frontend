'use client';
import { useRef, useState } from 'react';
import { Chart } from '@/components/today-news-detail/chart';

import { Button } from '@/components/ui/button';
import { NavigateBar } from '@/components/ui/navigate-bar';

import { Tooltip } from '@/components/ui/tooltip';
import { SegmentedControl, Text } from '@radix-ui/themes';
import '@splidejs/react-splide/css';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Splide, SplideSlide, SplideRef } from '@splidejs/react-splide';
import { Spacing } from '@/components/ui/spacing';
import { NewsSection } from '@/components/common/news-section';
import { useTab } from '@/components/today-news-detail/tabs';
import { AiSummarySection } from '@/components/today-news/ai-summary-section';
import { ReactionItemProps, ReactionSection } from '@/components/today-news/reaction-section';
import { News, NewsComparison, useNewsComparison } from '@/hooks/useNewsComparison';

type SelectedSlide = 'first' | 'second';

interface DetailPageParams {
  id: string;
  [key: string]: string | string[] | undefined;
}

export default function DetailPage() {
  const router = useRouter();
  const splideRef = useRef<SplideRef>(null);
  const [selected, setSelected] = useState<SelectedSlide>('first');
  const params = useParams<DetailPageParams>();
  
  // 안전한 타입 체크 및 검증
  const newsId = params?.id;
  
  if (!newsId) {
    return <div>올바르지 않은 뉴스 ID입니다.</div>;
  }
  
  const { data: newsComparison, isLoading, error } = useNewsComparison(newsId);

  // SegmentedControl 변경 시 슬라이드 이동
  const handleSegmentChange = (value: string) => {
    if (value === 'first' || value === 'second') {
      setSelected(value);

      if (splideRef.current) {
        splideRef.current.go(value === 'first' ? 0 : 1);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('News comparison fetch error:', error);
    return <div>Error: 페이지 로딩에 실패했습니다. ({error.message})</div>;
  }

  if (!newsComparison) {
    return <div>뉴스 비교 데이터를 찾을 수 없습니다.</div>;
  }

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
          <Button variant="ghost">
            <Image src="/share.png" alt="공유하기" width={22} height={22} />
          </Button>
        }
      />
      <Splide
        aria-label="뉴스 비교 슬라이드"
        options={{ arrows: false, pagination: false }}
        ref={splideRef}
        onMoved={(_: unknown, newIndex: number) => {
          setSelected(newIndex === 0 ? 'first' : 'second');
        }}
      >
        <SplideSlide>
          <NewsPage news={newsComparison.left_news} />
        </SplideSlide>
        <SplideSlide>
          <NewsPage news={newsComparison.right_news} />
        </SplideSlide>
      </Splide>
      <Spacing size={100} />
      <SegmentedControl.Root
        value={selected}
        onValueChange={handleSegmentChange}
        style={{ margin: '0 24px', width: '90%', position: 'fixed', bottom: 24, zIndex: 1000 }}
        size="3"
        radius="full"
      >
        <SegmentedControl.Item value="first">첫번째 뉴스</SegmentedControl.Item>
        <SegmentedControl.Item value="second">두번째 뉴스</SegmentedControl.Item>
      </SegmentedControl.Root>
    </>
  );
}

// NewsPage 컴포넌트의 타입 안전성 개선
interface NewsPageProps {
  news: News;
}

const NewsPage = ({ news }: NewsPageProps) => {
  const { tab } = useTab();

  // 안전한 배열 처리
  const aiSummaryDescription = news.summary?.join('') || '요약 정보가 없습니다.';

  const reactions: ReactionItemProps[] = [
    {
      isPositive: true,
      description: news.good_comment || '긍정적인 반응이 없습니다.',
    },
    {
      isPositive: false,
      description: news.bad_comment || '부정적인 반응이 없습니다.',
    },
  ];

  const tabContent = () => {
    switch (tab) {
      case 'political':
        return (
          <>
            <Tooltip text="AI가 분석한 정치성향" />
            <Chart 
              progressive={news.bias_score?.progressive || 0} 
              conservative={news.bias_score?.conservative || 0} 
            />
            <div style={{ margin: '12px 24px' }}>
              <Text>{news.bias_score?.reason || '분석 정보가 없습니다.'}</Text>
            </div>
          </>
        );
      case 'ai-summary':
        return <AiSummarySection description={aiSummaryDescription} />;
      case 'reaction':
        return <ReactionSection items={reactions} />;
      default:
        return null;
    }
  };

  return (
    <NewsSection
      thumbnail={news.thumbnail_url || ''}
      title={news.title || '제목 없음'}
      source={news.source || '출처 미상'}
      time={news.published_at || ''}
      content={tabContent()}
    />
  );
};