'use client';
import { Button } from '../ui/button';
import { Section } from '../ui/section';
import { Spacing } from '../ui/spacing';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@radix-ui/themes';
import { NewsCard } from '@/components/card/news-card';

import type { NewsSummary } from '@/types/news/news-summary';

interface HotNewsProps {
  todayNews?: NewsSummary[];
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
      {todayNews.map((news: NewsSummary) => (
        <NewsCard
          key={news.id}
          id={news.id}
          title={news.title}
          publisher={news.publisher}
          publishedAt={news.published_at}
          thumbnailUrl={news.thumbnail_url}
          onClick={() => handleNewsClick(news.id)}
          size="medium"
        />
      ))}
    </Section>
  );
};
