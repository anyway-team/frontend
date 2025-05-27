import { Button } from '../ui/button';
import { Section } from '../ui/section';
import styles from '../common.module.css';

export const TodayNewsSection = () => {
  return (
    <Section title="오늘의 뉴스 비교" action={<Button variant="ghost">더보기</Button>}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
      >
        <TodayNewsCard />
        <TodayNewsCard />
      </div>
    </Section>
  );
};

const TodayNewsCard = () => {
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
        김문수 &quot;당, 단일화 일방적 강요... 사무총장 임명 불발 유감&quot;
      </h3>
      <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>조선일보</p>
    </div>
  );
};
