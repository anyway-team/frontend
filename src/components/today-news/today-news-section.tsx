'use client';
import { Button } from '../ui/button';
import { Section } from '../ui/section';
import styles from '../common.module.css';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@radix-ui/themes';
import Image from 'next/image';
import { useState } from 'react';

interface TodayComparison {
  id: string;
  left_news_preview: {
    title: string;
    publisher: string;
    thumbnail_url?: string;
  };
  right_news_preview: {
    title: string;
    publisher: string;
    thumbnail_url?: string;
  };
}

interface TodayNewsSectionProps {
  todayComparisons?: TodayComparison;
}

export const TodayNewsSection = ({ todayComparisons }: TodayNewsSectionProps) => {
  const router = useRouter();

  const handleNewsClick = () => {
    const id = todayComparisons?.id;
    if (!id) return;
    router.push(`/today-news/detail/${id}`);
  };

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
        <Button variant="ghost" onClick={handleNewsClick}>
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
          thumbnailUrl={todayComparisons.left_news_preview.thumbnail_url}
          onClick={handleNewsClick}
        />
        <TodayNewsCard
          title={todayComparisons.right_news_preview.title}
          source={todayComparisons.right_news_preview.publisher}
          thumbnailUrl={todayComparisons.right_news_preview.thumbnail_url}
          onClick={handleNewsClick}
        />
      </div>
    </Section>
  );
};

const TodayNewsCard = ({
  title,
  source,
  thumbnailUrl,
  onClick,
}: {
  title?: string;
  source?: string;
  thumbnailUrl?: string;
  onClick: () => void;
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '126px',
      }}
      className={styles.pressable}
      onClick={onClick}
    >
      {/* 썸네일 이미지 */}
      {thumbnailUrl && !imageError ? (
        <div
          style={{ marginBottom: '8px', height: '60px', overflow: 'hidden', borderRadius: '4px' }}
        >
          <Image
            src={thumbnailUrl}
            alt={title || '뉴스 이미지'}
            width={200}
            height={60}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
            onError={() => setImageError(true)}
            unoptimized
          />
        </div>
      ) : (
        <div
          style={{
            marginBottom: '8px',
            height: '60px',
            backgroundColor: '#f3f4f6',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
            fontSize: '0.7rem',
          }}
        >
          이미지 없음
        </div>
      )}

      <div style={{ flex: 1 }}>
        <h3 style={{ fontWeight: 500, fontSize: '0.85rem', lineHeight: 1.2, marginBottom: 4 }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{source}</p>
      </div>
    </div>
  );
};
