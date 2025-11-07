'use client';

import { Skeleton } from '@radix-ui/themes';
import { NavigateBar } from '@/components/ui/navigate-bar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import styles from './recent-news-skeleton.module.css';

export const RecentNewsSkeleton = () => {
  return (
    <>
      <NavigateBar
        left={
          <Button variant="ghost">
            <Image src="/back.png" alt="back" width={24} height={24} />
          </Button>
        }
        right={null}
      />
      
      <div className={styles.container}>
        {/* 뉴스 카드 스켈레톤들 */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className={styles.newsCard}>
            <Skeleton className={styles.thumbnail} />
            <div className={styles.content}>
              <Skeleton className={styles.title} />
              <Skeleton className={styles.titleSecond} />
              <div className={styles.meta}>
                <Skeleton className={styles.publisher} />
                <Skeleton className={styles.date} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};