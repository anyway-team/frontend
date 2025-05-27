import { Nav } from '../components/ui/nav';
import styles from './page.module.css';
import { TodayNewsSection } from '../components/today-news/today-news-section';
import { Spacing } from '../components/ui/spacing';
import { HotNews } from '@/components/today-news/hot-news';
import { BottomNavigateBar } from '@/components/ui/bottom-navigate-bar';
import { Keywords } from '@/components/keywords';

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav />
      <Keywords />
      <Spacing />
      <TodayNewsSection />
      <Spacing />
      <HotNews />
      <BottomNavigateBar />
    </div>
  );
}
