import { Text } from '@radix-ui/themes';
import styles from '../page.module.css';

import { BottomNavigateBar } from '@/components/ui/bottom-navigate-bar';
import { CommingSoon } from '@/components/my/comming-soon';
export default function MyPage() {
  return (
    <div className={styles.page}>
      <Text size="6" weight="bold">
        마이페이지
      </Text>
      <CommingSoon />
      <BottomNavigateBar />
    </div>
  );
}
