'use client';
import { Button } from '../ui/button';
import { Section } from '../ui/section';
import { Spacing } from '../ui/spacing';
import { useRouter } from 'next/navigation';

export const HotNews = () => {
  const router = useRouter();
  return (
    <Section
      title="인기 뉴스"
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
      <Spacing size={4} />
      <HotNewsCard />
      <HotNewsCard />
      <HotNewsCard />
    </Section>
  );
};

const HotNewsCard = () => {
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
      <div
        style={{
          width: '120px',
          height: '120px',
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
        <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '8px' }}>
          뉴스 제목이 들어갑니다
        </div>
        <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '8px' }}>조선일보</div>
        <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>2024.05.01</div>
      </div>
    </div>
  );
};
