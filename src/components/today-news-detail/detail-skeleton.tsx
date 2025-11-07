'use client';

import { Skeleton } from '@radix-ui/themes';
import { NavigateBar } from '@/components/ui/navigate-bar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import styles from './detail-skeleton.module.css';

export const DetailSkeleton = () => {
  return (
    <>
      <NavigateBar
        left={
          <Button variant="ghost">
            <Image src="/back.png" alt="뒤로 가기" width={24} height={24} />
          </Button>
        }
        right={
          <Button variant="ghost">
            <Image src="/share.png" alt="공유하기" width={22} height={22} />
          </Button>
        }
      />
      
      <div className={styles.container}>
        <div className={styles.newsContainer}>
          {/* 썸네일 스켈레톤 */}
          <Skeleton className={styles.thumbnail} />
          
          {/* 제목 스켈레톤 */}
          <div className={styles.header}>
            <Skeleton className={styles.title} />
            <Skeleton className={styles.titleSecond} />
          </div>
          
          {/* 메타 정보 스켈레톤 */}
          <div className={styles.meta}>
            <Skeleton className={styles.source} />
            <Skeleton className={styles.time} />
          </div>
          
          {/* 탭 스켈레톤 */}
          <div className={styles.tabs}>
            <Skeleton className={styles.tab} />
            <Skeleton className={styles.tab} />
            <Skeleton className={styles.tab} />
          </div>
          
          {/* 콘텐츠 스켈레톤 */}
          <div className={styles.content}>
            <Skeleton className={styles.contentHeader} />
            <div className={styles.contentBody}>
              <Skeleton className={styles.contentLine} />
              <Skeleton className={styles.contentLine} />
              <Skeleton className={styles.contentLineShort} />
            </div>
          </div>
        </div>
        
        {/* 하단 세그먼트 컨트롤 스켈레톤 */}
        <div className={styles.segmentControl}>
          <Skeleton className={styles.segment} />
          <Skeleton className={styles.segment} />
        </div>
      </div>
    </>
  );
};