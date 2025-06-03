'use client';
import styles from './page.module.css';
import { formatDotYYYYMMDD } from '@/utils/datetime';

export default function RecentNewsPage() {
  const newsItems: RecentNewsCardProps[] = [
    {
      id: 1,
      title: '비상경제대응TF, 개헌 등 이재명 대선후보 기자간담회 주요 내용은?',
      press: '중앙일보',
      publishedAt: new Date('2024-05-01'),
      imageUrl: 'https://picsum.photos/200/300',
    },
  ];

  return (
    <div className={styles.page}>
      {newsItems.map((item) => (
        <RecentNewsCard key={item.id} {...item} />
      ))}
    </div>
  );
}

interface RecentNewsCardProps {
  id: number;
  title: string;
  press: string;
  publishedAt: Date;
  imageUrl: string;
}

const RecentNewsCard = ({ id, title, press, publishedAt, imageUrl }: RecentNewsCardProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: '12px',
        background: '#fff',
        minHeight: '140px',
      }}
    >
      <div
        style={{
          width: '140px',
          height: '140px',
          background: '#e5e7eb',
          marginRight: '12px',
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
        <div
          style={{
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: '25px',
            letterSpacing: '-0.17px',
          }}
        >
          {title}
        </div>
        <div>
          <div
            style={{
              fontWeight: 500,
              fontSize: '13px',
              lineHeight: '22.5px',
              letterSpacing: '-0.17px',
            }}
          >
            {press}
          </div>
          <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
            {formatDotYYYYMMDD(publishedAt)}
          </div>
        </div>
      </div>
    </div>
  );
};
