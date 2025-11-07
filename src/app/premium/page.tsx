'use client';

import { HomeNav } from '../../components/ui/home-nav';
import styles from '../page.module.css';

import { BottomNavigateBar } from '@/components/ui/bottom-navigate-bar';

import { PremiumFeatures } from '@/components/auth/premium-features';
import { Spacing } from '@/components/ui/spacing';

export default function PremiumPage() {
  return (
    <>
      <Spacing size={64} />
      <PremiumPageContent />
    </>
  );
}

function PremiumPageContent() {
  return (
    <div className={styles.page}>
      <HomeNav />
      <PremiumFeatures />
      <BottomNavigateBar />
    </div>
  );
}
