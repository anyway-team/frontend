'use client';

import { BottomNavigateBar } from '@/components/ui/bottom-navigate-bar';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { GuestMyPage } from '@/components/my/GuestMyPage';
import { RegularUserMyPage } from '@/components/my/RegularUserMyPage';
import { PremiumUserMyPage } from '@/components/my/PremiumUserMyPage';
import { Spacing } from '@/components/ui/spacing';
import { HomeNav } from '@/components/ui/home-nav';

export default function MyPage() {
  return (
    <>
      <HomeNav />
      <Spacing size={70} />
      <MyPageContent />
    </>
  );
}

function MyPageContent() {
  const { isAuthenticated, user, restoreAuth, isLoading, isGuest, isRegularUser, isPremium } =
    useAuth();

  useEffect(() => {
    restoreAuth();
  }, [restoreAuth]);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '16px', color: '#666' }}>로딩 중...</div>
        <BottomNavigateBar />
      </div>
    );
  }

  const renderMyPageContent = () => {
    if (!isAuthenticated || isGuest) {
      return <GuestMyPage />;
    }

    if (isPremium && user) {
      return <PremiumUserMyPage user={user} />;
    }

    if (isRegularUser && user) {
      return <RegularUserMyPage user={user} />;
    }

    return <GuestMyPage />;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        paddingBottom: '80px',
      }}
    >
      {renderMyPageContent()}
      <BottomNavigateBar />
    </div>
  );
}
