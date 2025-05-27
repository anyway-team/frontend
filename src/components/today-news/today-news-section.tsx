'use client';
import { Button } from '../ui/button';
import { Section } from '../ui/section';
import styles from '../common.module.css';
import { useRouter } from 'next/navigation';

export const TodayNewsSection = () => {
  const router = useRouter();
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
          title="비상경제대응TF, 개헌 등 이재명 대선후보 기자간담회 주요 내용은?"
          source="조선일보"
        />
        <TodayNewsCard
          title="&lsquo;친윤 당권 제안설&rsquo;에 이준석 &ldquo;저한텐 없었다…호사가들 얘기&rdquo;"
          source="중앙일보"
        />
      </div>
    </Section>
  );
};

const TodayNewsCard = ({ title, source }: { title: string; source: string }) => {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        padding: '12px',
      }}
      className={styles.pressable}
    >
      <h3 style={{ fontWeight: 500, fontSize: '0.95rem', lineHeight: 1.2, marginBottom: 8 }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>{source}</p>
    </div>
  );
};
