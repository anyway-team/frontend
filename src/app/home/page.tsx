import { Keywords } from '@/components/keywords';
import { HomeNav } from '../../components/ui/home-nav';
import styles from '../page.module.css';
import { TodayNewsSection } from '@/components/today-news/today-news-section';
import { HotNews } from '@/components/today-news/hot-news';
import { Spacing } from '@/components/ui/spacing';
import { BottomNavigateBar } from '@/components/ui/bottom-navigate-bar';

export default function Home() {
  return (
    <div className={styles.page}>
      <HomeNav />
      <Keywords />
      <Spacing />
      <TodayNewsSection />
      <Spacing />
      <HotNews />
      <BottomNavigateBar />
    </div>
  );
}
