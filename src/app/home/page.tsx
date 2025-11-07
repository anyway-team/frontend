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
      <ins
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit="DAN-NXrXtL3gqeDYAsaj"
        data-ad-width="320"
        data-ad-height="50"
      ></ins>
      <TodayNewsSection todayComparisons={homeData?.today_comparisons} />
      <Spacing />
      <HotNews todayNews={homeData?.today_news} />
      <BottomNavigateBar />
    </div>
  );
}
