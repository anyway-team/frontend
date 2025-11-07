'use client';

import { HomeNav } from '../../components/ui/home-nav';
import styles from '../page.module.css';

import { BottomNavigateBar } from '@/components/ui/bottom-navigate-bar';

import { PremiumFeatures } from '@/components/auth/premium-features';

export default function PremiumPage() {
  return (
    <div className={styles.page}>
      <HomeNav />
      <PremiumFeatures />
      <BottomNavigateBar />
    </div>
  );
}
