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

export default function DetailPage() {
  const router = useRouter();
  const splideRef = useRef<SplideRef>(null);
  const [selected, setSelected] = useState('first');
  const { id } = useParams();
  const { data: newsComparison, isLoading, error } = useNewsComparison(id as string);

  // SegmentedControl 변경 시 슬라이드 이동
  const handleSegmentChange = (value: string) => {
    setSelected(value);

    if (splideRef.current) {
      if (value === 'first') splideRef.current.go(0);
      if (value === 'second') splideRef.current.go(1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: 페이지 로딩에 실패했습니다.</div>;
  }

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
      <Splide
        aria-label="My Favorite Images"
        options={{ arrows: false, pagination: false }}
        ref={splideRef}
        /** splide 에서 타입을 제공하지 않아서 직접 정의 필요 */
        onMoved={(_: unknown, newIndex: number) => {
          setSelected(newIndex === 0 ? 'first' : 'second');
        }}
      >
        <SplideSlide>
          <NewsPage news={newsComparison?.left_news} />
        </SplideSlide>
        <SplideSlide>
          <NewsPage news={newsComparison?.right_news} />
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

const NewsPage = ({ news }: { news: News}) => {
  const { tab } = useTab();

  const aiSummaryDescription = news.summary.join('');

  const reactions: ReactionItemProps[] = [
    {
      isPositive: true,
      description: news.good_comment,
    },
    {
      isPositive: false,
      description: news.bad_comment,
    },
  ];

  const tabContent = () => {
    switch (tab) {
      case 'political':
        return (
          <>
            <Tooltip text="AI가 분석한 정치성향" />
            <Chart 진보={news.bias_score.progressive} 보수={news.bias_score.conservative} />
            <div style={{ margin: '12px 24px' }}>
              <Text>{news.bias_score.reason}</Text>
            </div>
          </>
        )
      case 'ai-summary':
        return <AiSummarySection description={aiSummaryDescription} />;
      case 'reaction':
        return <ReactionSection items={reactions} />;
      default:
        return null;
    }
  }


  return (
    <NewsSection
      thumbnail={news.thumbnail_url || ''}
      title={news.title}
      source={news.source}
      time={news.published_at}
      content={tabContent()}
    />
  )
}