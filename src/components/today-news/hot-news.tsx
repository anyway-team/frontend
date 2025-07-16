'use client';
import { Button } from '../ui/button';
import { Section } from '../ui/section';
import { Spacing } from '../ui/spacing';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@radix-ui/themes';
import Image from 'next/image';
import { useState } from 'react';
import { formatDateTime } from '@/utils/datetime';

interface TodayNewsItem {
  id: string;
  title: string;
  published_at: string;
  thumbnail_url: string;
  publisher: string;
}

interface HotNewsProps {
  todayNews?: TodayNewsItem[];
}

export const HotNews = ({ todayNews }: HotNewsProps) => {
  const router = useRouter();

  const handleNewsClick = (id: string) => {
    router.push(`/news/${id}`);
  };

  // 데이터가 없을 때는 스켈레톤 표시
  if (!todayNews) {
    return (
      <Section title="인기 뉴스" action={<></>}>
        <Spacing size={4} />
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <Skeleton style={{ width: '100%', height: 80, borderRadius: 8 }} />
          </div>
        ))}
      </Section>
    );
  }

  // 뉴스 배열이 비어있을 때는 기본 메시지 표시
  if (todayNews.length === 0) {
    return (
      <Section title="인기 뉴스" action={<></>}>
        <Spacing size={4} />
        <div
          style={{
            padding: '40px 20px',
            textAlign: 'center',
            color: '#6b7280',
            fontSize: '0.9rem',
          }}
        >
          현재 표시할 뉴스가 없습니다
        </div>
      </Section>
    );
  }

  return (
    <Section
      title="인기 뉴스"
      action={
        <Button
          variant="ghost"
          onClick={() => {
            router.push('/recent-news');
          }}
        >
          더보기
        </Button>
      }
    >
      <Spacing size={4} />
      {todayNews.map((news: TodayNewsItem) => (
        <HotNewsCard key={news.id} news={news} onClick={() => handleNewsClick(news.id)} />
      ))}
    </Section>
  );
};

const HotNewsCard = ({ news, onClick }: { news: TodayNewsItem; onClick: () => void }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'stretch',
        marginBottom: '12px',
        background: '#fff',
        minHeight: '120px',
        gap: '12px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {/* 썸네일 이미지 */}
      {news.thumbnail_url && !imageError ? (
        <div style={{ width: '120px', height: '120px', borderRadius: '8px', overflow: 'hidden' }}>
          <Image
            src={news.thumbnail_url}
            alt={news.title}
            width={120}
            height={120}
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
            width: '120px',
            height: '120px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
          }}
        >
          이미지 없음
        </div>
      )}

      {/* 뉴스 정보 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '8px' }}>{news.title}</div>
        <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '8px' }}>
          {news.publisher}
        </div>
        <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
          {formatDateTime(news.published_at)}
        </div>
      </div>
    </div>
  );
};
