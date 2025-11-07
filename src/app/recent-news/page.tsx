'use client';
import { NavigateBar } from '@/components/ui/navigate-bar';
import styles from './page.module.css';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Spacing } from '@/components/ui/spacing';
import { useNews } from '@/hooks/useNews';
import { useDebounce } from '@/hooks/useDebounce';
import { NewsCard } from '@/components/card/news-card';
import { RecentNewsSkeleton } from '@/components/recent-news/recent-news-skeleton';

export default function RecentNewsPage() {
  return (
    <>
      <Spacing size={64} />
      <RecentNewsPageContent />
    </>
  );
}

function RecentNewsPageContent() {
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

  const handleNewsClick = (id: string) => {
    router.push(`/news/${id}`);
  };

  if (isLoading) {
    return <RecentNewsSkeleton />;
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
      <div className={styles.page}>
        {newsItems.map((item) => (
          <NewsCard
            key={item.id}
            id={item.id}
            title={item.title}
            publisher={item.publisher}
            publishedAt={item.published_at}
            thumbnailUrl={item.thumbnail_url}
            onClick={() => handleNewsClick(item.id)}
            size="large"
          />
        ))}
        <div ref={loadMoreRef} style={{ height: '20px' }} />
        {isFetchingNextPage && <div>불러오는 중...</div>}
      </div>
    </>
  );
}
