'use client';
import { Button } from '../ui/button';
import { Section } from '../ui/section';
import { Spacing } from '../ui/spacing';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Skeleton } from '@radix-ui/themes';
import Image from 'next/image';

interface TodayNewsItem {
  id: string;
  title: string;
  published_at: string;
  thumbnail_url: string;
  publisher: string;
}

export const HotNews = () => {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/home'],
    queryFn: async () => {
      const res = await axios.get('/api/home');
      return res.data;
    },
  });

  if (isLoading)
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
  if (error) return null;

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
      {data?.today_news?.map((news: TodayNewsItem) => (
        <HotNewsCard key={news.id} news={news} />
      ))}
    </Section>
  );
};

const HotNewsCard = ({ news }: { news: TodayNewsItem }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '12px',
        background: '#fff',
        minHeight: '80px',
      }}
    >
      <Image
        src={news.thumbnail_url}
        alt={news.title}
        width={120}
        height={120}
        style={{
          objectFit: 'cover',
          background: '#e5e7eb',
          borderRadius: '8px',
          marginRight: '16px',
          flexShrink: 0,
        }}
      />
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
          {new Date(news.published_at).toLocaleDateString('ko-KR')}
        </div>
      </div>
    </div>
  );
};
