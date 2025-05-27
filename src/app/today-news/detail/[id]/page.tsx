'use client';
import { useRef, useState } from 'react';
import { Chart } from '@/components/today-news-detail/chart';
import { Tabs } from '@/components/today-news-detail/tabs';
import { Button } from '@/components/ui/button';
import { NavigateBar } from '@/components/ui/navigate-bar';
import { Thumbnail } from '@/components/ui/thumbnail';
import { Tooltip } from '@/components/ui/tooltip';
import { Avatar, Flex, SegmentedControl, Text } from '@radix-ui/themes';
import '@splidejs/react-splide/css';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Splide, SplideSlide, SplideRef } from '@splidejs/react-splide';
import { Spacing } from '@/components/ui/spacing';

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
  return (
    <>
      <Thumbnail url="/sample2.webp" />
      <div style={{ padding: '12px 24px' }}>
        <Text size="5" weight="bold" style={{ marginTop: 16 }}>
          비상경제대응TF, 개헌 등 이재명 대선후보 기자간담회 주요 내용은? - BBC News 코리아
        </Text>
      </div>
      <Flex gap="4" align="center" justify="between" style={{ margin: '12px 24px' }}>
        <Flex gap="2" align="center">
          <Avatar radius="full" fallback="중" />
          <Text size="2" weight="bold">
            중앙일보
          </Text>
        </Flex>
        <Text size="2" color="gray">
          1시간 전
        </Text>
      </Flex>
      <Tabs />
      <Tooltip text="AI가 분석한 정치성향" />

      <Chart 진보={80} 보수={20} />
      <div style={{ margin: '12px 24px' }}>
        <Text>
          AI가 분석한 정치성향을 확인해보세요. 진보 성향이 더 강하다고 판단했어요. 이유는 뉴스
          내용에 이재명 후보의 개헌 의견이 더 많이 들어가 있기 때문이에요.
        </Text>
      </div>
    </>
  );
};

const SecondNews = () => {
  return (
    <>
      <Thumbnail url="/sample.jpeg" />
      <div style={{ padding: '12px 24px' }}>
        <Text size="5" weight="bold" style={{ marginTop: 16 }}>
          &lsquo;친윤 당권 제안설&rsquo;에 이준석 &ldquo;저한텐 없었다…호사가들 얘기&rdquo;
        </Text>
      </div>
      <Flex gap="4" align="center" justify="between" style={{ margin: '12px 24px' }}>
        <Flex gap="2" align="center">
          <Avatar radius="full" fallback="중" />
          <Text size="2" weight="bold">
            중앙일보
          </Text>
        </Flex>
        <Text size="2" color="gray">
          1시간 전
        </Text>
      </Flex>
      <Tabs />
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
};
