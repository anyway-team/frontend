'use client';
import { Keywords } from '@/components/keywords';
import { HomeNav } from '../../components/ui/home-nav';
import styles from '../page.module.css';
import { TodayNewsSection } from '@/components/today-news/today-news-section';
import { HotNews } from '@/components/today-news/hot-news';
import { Spacing } from '@/components/ui/spacing';
import { BottomNavigateBar } from '@/components/ui/bottom-navigate-bar';
import { useHomeData } from '@/hooks/useHomeData';
import { Skeleton } from '@radix-ui/themes';

export default function Home() {
  const { data: homeData, isLoading } = useHomeData();

  // 전체적인 로딩 상태에서는 기본 스켈레톤 표시
  if (isLoading) {
    return (
      <div className={styles.page}>
        <HomeNav />
        <div style={{ padding: '20px 0' }}>
          <Skeleton style={{ width: '100%', height: '40px', marginBottom: '20px' }} />
          <Skeleton style={{ width: '100%', height: '120px', marginBottom: '20px' }} />
          <Skeleton style={{ width: '100%', height: '200px' }} />
        </div>
        <BottomNavigateBar />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <HomeNav />
      <Keywords keywords={homeData?.hot_keywords} />
      <Spacing />
      <TodayNewsSection todayComparisons={homeData?.today_comparisons} />
      <Spacing />
      <HotNews todayNews={homeData?.today_news} />
      <BottomNavigateBar />
    </div>
  );
}
