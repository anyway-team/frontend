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
    '김 후보는 이날 언론 공지를 통해 ‘단일화와 당무 관련 입장’을 내고 이렇게 말했다. 김 후보는 범보수 진영의 ‘반(反)이재명 빅텐트’ 구성에 한덕수 무소속 대선 예비 후보, 이준석 개혁신당 대선 후보, 이낙연 새로운미래 상임고문 등이 포함돼야 한다고 밝혔다.' +
    '김 후보는 “예정대로 단일화를 추진하기 위해, 지난 4일 당 중앙선대위에 단일화 추진 기구를 설치할 것을 지시한 바 있다”며 “단일화는 후보가 제안한 단일화 추진 기구 구성을 중앙선대위가 신속히 받아들인다면 빠르게 추진될 수 있다”고 했다. 단일화 협상이 늦어지는 이유는 추진 기구 구성이 지연되기 때문이라는 것이다';

  const reactionItems: ReactionItemProps[] = [
    {
      isPositive: true,
      description:
        '깨끗한 승복 태도 결과에 깨끗이 승복하고 상대 후보를 응원하겠다는 모습에 대해 “정치인의 성숙한 자세”, “민주주의 원칙을 지키는 모습”이라며 긍정적으로 평가하는 의견이 있습니다.',
    },
    {
      isPositive: false,
      description:
        '정치적 타격과 한계 지적 당내에서는 “당 대표까지 했던 한동훈이 갑작스럽게 출마한\n김문수 후보에게 진 것은 치명적”이라는 의견,\n“당원 투표 득표율이 크게 떨어진 것은\n‘배신자 프레임’이 먹혔기 때문”이라는 분석 등,\n한동훈 후보의 정치적 입지 약화와\n한계를 지적하는 반응이 많습니다.',
    },
  ];

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
        return <AiSummarySection description={aiSummaryDescription} />;
      case 'reaction':
        return <ReactionSection items={reactionItems} />;
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

  const aiSummaryDescription =
    '김 후보는 이날 언론 공지를 통해 ‘단일화와 당무 관련 입장’을 내고 이렇게 말했다. 김 후보는 범보수 진영의 ‘반(反)이재명 빅텐트’ 구성에 한덕수 무소속 대선 예비 후보, 이준석 개혁신당 대선 후보, 이낙연 새로운미래 상임고문 등이 포함돼야 한다고 밝혔다.' +
    '김 후보는 “예정대로 단일화를 추진하기 위해, 지난 4일 당 중앙선대위에 단일화 추진 기구를 설치할 것을 지시한 바 있다”며 “단일화는 후보가 제안한 단일화 추진 기구 구성을 중앙선대위가 신속히 받아들인다면 빠르게 추진될 수 있다”고 했다. 단일화 협상이 늦어지는 이유는 추진 기구 구성이 지연되기 때문이라는 것이다';

  const reactionItems: ReactionItemProps[] = [
    {
      isPositive: true,
      description:
        '깨끗한 승복 태도 결과에 깨끗이 승복하고 상대 후보를 응원하겠다는 모습에 대해 “정치인의 성숙한 자세”, “민주주의 원칙을 지키는 모습”이라며 긍정적으로 평가하는 의견이 있습니다.',
    },
    {
      isPositive: false,
      description:
        '정치적 타격과 한계 지적 당내에서는 “당 대표까지 했던 한동훈이 갑작스럽게 출마한\n김문수 후보에게 진 것은 치명적”이라는 의견,\n“당원 투표 득표율이 크게 떨어진 것은\n‘배신자 프레임’이 먹혔기 때문”이라는 분석 등,\n한동훈 후보의 정치적 입지 약화와\n한계를 지적하는 반응이 많습니다.',
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
                AI가 분석한 정치성향을 확인해보세요. 보수 성향이 더 강하다고 판단했어요. 이유는 뉴스
                내용에 이준석 후보의 친윤 당권 제안설이 더 많이 들어가 있기 때문이에요.
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
      title="비상경제대응TF, 개헌 등 이재명 대선후보 기자간담회 주요 내용은?"
      source="중앙일보"
      time="1시간 전"
      content={tabContent()}
    />
  );
};
