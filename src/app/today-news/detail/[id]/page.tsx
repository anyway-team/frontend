'use client';
import { useRef, useState } from 'react';
import { Chart } from '@/components/today-news-detail/chart';

import { Button } from '@/components/ui/button';
import { NavigateBar } from '@/components/ui/navigate-bar';

import { Tooltip } from '@/components/ui/tooltip';
import { SegmentedControl, Text } from '@radix-ui/themes';
import '@splidejs/react-splide/css';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Splide, SplideSlide, SplideRef } from '@splidejs/react-splide';
import { Spacing } from '@/components/ui/spacing';
import { NewsSection } from '@/components/common/news-section.tsx';
import { useTab } from '@/components/today-news-detail/tabs';

export default function DetailPage() {
  const router = useRouter();
  const splideRef = useRef<SplideRef>(null);
  const [selected, setSelected] = useState('first');

  // SegmentedControl 변경 시 슬라이드 이동
  const handleSegmentChange = (value: string) => {
    setSelected(value);

    if (splideRef.current) {
      if (value === 'first') splideRef.current.go(0);
      if (value === 'second') splideRef.current.go(1);
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
          <FirstNews />
        </SplideSlide>
        <SplideSlide>
          <SecondNews />
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

const FirstNews = () => {
  const { tab } = useTab();

  const tabContent = () => {
    switch (tab) {
      case 'political':
        return (
          <>
            <Chart 진보={80} 보수={20} />
            <div style={{ margin: '12px 24px' }}>
              <Text>
                AI가 분석한 정치성향을 확인해보세요. 진보 성향이 더 강하다고 판단했어요. 이유는 뉴스
                내용에 이재명 후보의 개헌 의견이 더 많이 들어가 있기 때문이에요.
              </Text>
            </div>
          </>
        );
      case 'ai-summary':
        return <div>AI 요약</div>;
      case 'reaction':
        return <div>반응</div>;
      default:
        return null;
    }
  };
  return (
    <NewsSection
      title="비상경제대응TF, 개헌 등 이재명 대선후보 기자간담회 주요 내용은?"
      source="중앙일보"
      time="1시간 전"
      content={tabContent()}
    />
  );
};

const SecondNews = () => {
  const { tab } = useTab();

  const tabContent = () => {
    switch (tab) {
      case 'political':
        return (
          <>
            <Tooltip text="AI가 분석한 정치성향" />
            <Chart 진보={20} 보수={80} />
            <div style={{ margin: '12px 24px' }}>
              <Text>
                AI가 분석한 정치성향을 확인해보세요. 보수 성향이 더 강하다고 판단했어요. 이유는 뉴스
                내용에 이준석 후보의 친윤 당권 제안설이 더 많이 들어가 있기 때문이에요.
              </Text>
            </div>
          </>
        );

      case 'ai-summary':
        return <div>AI 요약</div>;
      case 'reaction':
        return <div>반응</div>;
      default:
        return null;
    }
  };
  return (
    <NewsSection
      title="비상경제대응TF, 개헌 등 이재명 대선후보 기자간담회 주요 내용은?"
      source="중앙일보"
      time="1시간 전"
      content={tabContent()}
    />
  );
};
