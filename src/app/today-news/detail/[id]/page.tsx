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
import { NewsSection } from '@/components/common/news-section';
import { useTab } from '@/components/today-news-detail/tabs';
import { AiSummarySection } from '@/components/today-news/ai-summary-section';
import { ReactionItemProps, ReactionSection } from '@/components/today-news/reaction-section';

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

  const aiSummaryDescription =
    '이재명 정부는 내수 침체 극복을 위해 서민경제 살리기를 첫 국정과제로 내세웠다.' +
    '자영업자 수는 외환위기 때보다 줄고, 경기 침체로 폐업 위기가 확산됐다.' +
    '정부와 여당은 21조 원 규모의 추경과 1인당 25만 원 지역화폐 지급을 검토했다.' +
    '채무 조정과 함께 지역화폐 정책이 지역경제 회복에 기여할지 주목된다.';

  const reactionItems: ReactionItemProps[] = [
    {
      isPositive: true,
      description:
        '이재명 정부와 더불어민주당이 추진하는 서민경제 지원 정책에 대해, 지역화폐 지급이 소상공인 매출 회복과 지역경제 활성화에 큰 도움이 될 것이라는 기대감이 커졌어요. 실질적인 민생지원책으로 소비 촉진과 내수 살리기 효과가 기대된다는 긍정적인 반응이 나왔어요.',
    },
    {
      isPositive: false,
      description:
        '전 국민에 무차별적으로 지급하는 지원금이 재정 낭비로 이어질 수 있다는 우려가 있었어요. 물가 상승과 재정 건전성 악화 등 부작용이 나타날 수 있다는 비판도 함께 나왔어요',
    },
  ];

  const tabContent = () => {
    switch (tab) {
      case 'political':
        return (
          <>
            <Tooltip text="AI가 분석한 정치성향" />
            <Chart 진보={80} 보수={20} />
            <div style={{ margin: '12px 24px' }}>
              <Text>
                AI가 분석한 정치성향을 확인해보세요. 이 기사는 진보 성향의 뉴스로 볼 수 있어요.
                정부와 더불어민주당이 추진하는 서민경제 지원 정책을 긍정적으로 조명하고, 지역화폐
                지급 등 직접 지원책의 필요성을 강조하고 있어요. 정책 효과에 대한 기대와 민생회복에
                초점을 맞춘 내용이 진보적 시각과 맞닿아 있어요.
              </Text>
            </div>
          </>
        );
      case 'ai-summary':
        return <AiSummarySection description={aiSummaryDescription} />;
      case 'reaction':
        return <ReactionSection items={reactionItems} />;
      default:
        return null;
    }
  };
  return (
    <NewsSection
      thumbnail="/sample2.webp"
      title="골목상권 살리자...25만 원 지역화폐 기대"
      source="MBC"
      time="2025-06-08 07:11"
      content={tabContent()}
    />
  );
};

const SecondNews = () => {
  const { tab } = useTab();

  const aiSummaryDescription =
    '더불어민주당이 추진하는 25만 원 지역화폐 지급 정책은 소비 진작을 명분으로 내세웠지만, 반복되는 일회성 지원이 근본적인 경제 회복으로 이어지지 않는다는 지적이 나왔어요.' +
    '지역화폐는 단기적 소비를 촉진할 수 있지만, 고용과 소득의 구조적 문제를 해결하지 못한다는 한계가 있다고 했어요.' +
    '정책의 일관성과 구조 개혁이 중요하다는 목소리가 커지면서, 단순한 금액 지원이 아니라 재발 방지와 지속 가능한 제도 설계가 필요하다고 강조했어요.' +
    '결국 중요한 것은 얼마를 주느냐가 아니라, 왜 또 지원해야 하는지에 대한 구조적 해법을 마련하는 것이라는 의견이 제기됐어요';

  const reactionItems: ReactionItemProps[] = [
    {
      isPositive: true,
      description:
        '지역화폐 지급이 소상공인과 자영업자 매출 회복에 도움이 될 수 있다는 기대가 시장에서 나오고 있어요. 정부의 직접 지원책이 내수 침체를 완화하고 경제 활성화에 기여할 수 있다는 긍정적 시각도 있어요',
    },
    {
      isPositive: false,
      description:
        '반복되는 일회성 지원은 근본적인 경제 문제 해결에 한계가 있다는 비판이 제기돼요. 재정 건전성 악화와 물가 상승 등 부작용 우려가 커지고 있어요',
    },
  ];

  const tabContent = () => {
    switch (tab) {
      case 'political':
        return (
          <>
            <Tooltip text="AI가 분석한 정치성향" />
            <Chart 진보={20} 보수={80} />
            <div style={{ margin: '12px 24px' }}>
              <Text>
                AI가 분석한 정치성향을 확인해보세요. 이 기사는 직접적으로 “진보” 또는 “보수”라고
                명시하지는 않지만, 더불어민주당의 25만 원 지역화폐 지급 정책에 대해 비판적이고
                한계를 지적하는 시각을 담고 있어요. 이런 비판적 논조와 구조적 해법(정책 일관성, 지속
                가능성 등) 강조는 보수 성향 언론에서 자주 보이는 특징이에요. 따라서 이 기사는 보수적
                성향에 가깝다고 볼 수 있어요.
              </Text>
            </div>
          </>
        );

      case 'ai-summary':
        return <AiSummarySection description={aiSummaryDescription} />;
      case 'reaction':
        return <ReactionSection items={reactionItems} />;
      default:
        return null;
    }
  };
  return (
    <NewsSection
      thumbnail="/sample.jpg"
      title="“지원은 있지만, 구조는 없다”.. 25만 원 지역화폐, 문제는 ‘소비’가 아니라 ‘시스템’"
      source="SBS"
      time="2025-06-06 08:21"
      content={tabContent()}
    />
  );
};
