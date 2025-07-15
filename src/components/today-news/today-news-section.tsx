'use client';
import { Button } from '../ui/button';
import { Section } from '../ui/section';
import styles from '../common.module.css';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@radix-ui/themes';

interface TodayComparison {
  id: string;
  left_news_preview: {
    title: string;
    publisher: string;
  };
  right_news_preview: {
    title: string;
    publisher: string;
  };
}

interface TodayNewsSectionProps {
  todayComparisons?: TodayComparison;
}

export const TodayNewsSection = ({ todayComparisons }: TodayNewsSectionProps) => {
  const router = useRouter();

  const hasData =
    todayComparisons?.left_news_preview?.title != null &&
    todayComparisons?.right_news_preview?.title != null &&
    todayComparisons?.left_news_preview?.publisher != null &&
    todayComparisons?.right_news_preview?.publisher != null;

  // 데이터가 없을 때는 스켈레톤 표시
  if (!hasData) {
    return (
      <Section title="오늘의 뉴스 비교" action={<></>}>
        <div style={{ display: 'flex', gap: '12px', padding: '12px 0' }}>
          <Skeleton
            style={{
              height: '126px',
              width: '50%',
              borderRadius: '0.5rem',
            }}
          />
          <Skeleton
            style={{
              height: '126px',
              width: '50%',
              borderRadius: '0.5rem',
            }}
          />
        </div>
      </Section>
    );
  }

  return (
    <Section
      title="오늘의 뉴스 비교"
      action={
        <Button
          variant="ghost"
          onClick={() => {
            router.push('/today-news/detail/10');
          }}
        >
          더보기
        </Button>
      }
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
      >
        <TodayNewsCard
          title={todayComparisons.left_news_preview.title}
          source={todayComparisons.left_news_preview.publisher}
          onClick={() => {
            router.push('/today-news/detail/10');
          }}
        />
        <TodayNewsCard
          title={todayComparisons.right_news_preview.title}
          source={todayComparisons.right_news_preview.publisher}
          onClick={() => {
            router.push('/today-news/detail/10');
          }}
        />
      </div>
    </Section>
  );
};

const TodayNewsCard = ({
  title,
  source,
  onClick,
}: {
  title?: string;
  source?: string;
  onClick: () => void;
}) => {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      className={styles.pressable}
      onClick={onClick}
    >
      <h3 style={{ fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.2, marginBottom: 8 }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>{source}</p>
    </div>
  );
};
