'use client';
import styles from './page.module.css';
import { getTimeAgo } from '@/utils/datetime';
import Image from 'next/image';
import { useState } from 'react';

export default function RecentNewsPage() {
  const newsItems: RecentNewsCardProps[] = [
    {
      id: 1,
      title: '비상경제대응TF, 개헌 등 이재명 대선후보 기자간담회 주요 내용은?',
      press: '중앙일보',
      publishedAt: new Date('2024-05-01'),
      imageUrl: 'https://picsum.photos/200/300',
    },
    {
      id: 2,
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

const Thumbnail = ({ size = 140, imageUrl }: { size?: number; imageUrl: string }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        style={{
          width: size,
          height: size,
          background: '#e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>이미지 로드 실패</span>
      </div>
    );
  }
  return (
    <Image
      src={imageUrl}
      alt="thumbnail"
      width={size}
      height={size}
      style={{ objectFit: 'cover', aspectRatio: '1/1' }}
      onError={() => setError(true)}
    />
  );
};

const RecentNewsCard = ({ title, press, publishedAt, imageUrl }: RecentNewsCardProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: '12px',
        background: '#fff',
        minHeight: '140px',
        gap: '12px',
      }}
    >
      <Thumbnail imageUrl={imageUrl} />
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
          <PublishedAtLabel publishedAt={publishedAt} />
        </div>
      </div>
    </div>
  );
};

const PublishedAtLabel = ({ publishedAt }: { publishedAt: Date }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
      <span
        style={{
          fontWeight: 700,
          fontSize: '13px',
          lineHeight: '100%',
          letterSpacing: '-0.17px',
          color: '#4B9CFF',
        }}
      >
        발행
      </span>
      <span
        style={{
          color: '#666666',
          fontSize: '13px',
          lineHeight: '22.5px',
          letterSpacing: '-0.17px',
        }}
      >
        ·
      </span>
      <span
        style={{
          fontWeight: 500,
          fontSize: '13px',
          lineHeight: '22.5px',
          letterSpacing: '-0.17px',
          color: '#666666',
        }}
      >
        {getTimeAgo(publishedAt)}
      </span>
    </div>
  );
};
