'use client';
import { Button } from '../ui/button';
import { Section } from '../ui/section';
import styles from '../common.module.css';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Skeleton } from '@radix-ui/themes';

export const TodayNewsSection = () => {
  const router = useRouter();
  const {
    data: today_comparisons,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['/api/home'],
    queryFn: async () => {
      const res = await axios.get('/api/home');
      return res.data;
    },
    select: (data) => {
      return data.today_comparisons;
    },
  });

  /** TODO: 에러 및 로딩 폴백 UI 정의 */
  if (isLoading)
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
  if (error) return null;

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
        {today_comparisons != null ? (
          <>
            <TodayNewsCard
              title={today_comparisons.left_news_preview.title}
              source={today_comparisons.left_news_preview.publisher}
              onClick={() => {
                router.push('/today-news/detail/10');
              }}
            />
            <TodayNewsCard
              title={today_comparisons.right_news_preview.title}
              source={today_comparisons.right_news_preview.publisher}
              onClick={() => {
                router.push('/today-news/detail/10');
              }}
            />
          </>
        ) : null}
      </div>
    </Section>
  );
};

const TodayNewsCard = ({
  title,
  source,
  onClick,
}: {
  title: string;
  source: string;
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
