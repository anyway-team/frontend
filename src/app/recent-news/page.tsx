'use client';
import { NavigateBar } from '@/components/ui/navigate-bar';
import styles from './page.module.css';
import { getTimeAgo } from '@/utils/datetime';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Spacing } from '@/components/ui/spacing';
import { useNews } from '@/hooks/useNews';
import { useDebounce } from '@/hooks/useDebounce';

export default function RecentNewsPage() {
  const router = useRouter();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useNews(10);
  const [shouldFetch, setShouldFetch] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const debouncedShouldFetch = useDebounce(shouldFetch, 300);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          setShouldFetch(true);
        } else {
          setShouldFetch(false);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (debouncedShouldFetch) {
      fetchNextPage();
    }
  }, [debouncedShouldFetch, fetchNextPage, isFetchingNextPage]);

  const newsItems = data?.pages.flatMap((page) => page.news) ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavigateBar
        left={
          <Button variant="ghost">
            <Image
              src="/back.png"
              alt="back"
              width={24}
              height={24}
              onClick={() => router.back()}
            />
          </Button>
        }
        right={null}
      />
      <Spacing size={56} />
      <div className={styles.page}>
        {newsItems.map((item) => (
          <RecentNewsCard
            key={item.id}
            id={item.id}
            title={item.title}
            press={item.publisher}
            publishedAt={new Date(item.published_at)}
            imageUrl={item.thumbnail_url}
          />
        ))}
        <div ref={loadMoreRef} style={{ height: '20px' }} />
        {isFetchingNextPage && <div>불러오는 중...</div>}
      </div>
    </>
  );
}

interface RecentNewsCardProps {
  id: string;
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
