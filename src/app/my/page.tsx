'use client';

import { BottomNavigateBar } from '@/components/ui/bottom-navigate-bar';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { GuestMyPage } from '@/components/my/GuestMyPage';
import { RegularUserMyPage } from '@/components/my/RegularUserMyPage';
import { PremiumUserMyPage } from '@/components/my/PremiumUserMyPage';

export default function MyPage() {
  const { isAuthenticated, user, restoreAuth, isLoading, isGuest, isRegularUser, isPremium } = useAuth();

  // 컴포넌트 마운트 시 인증 상태 복원
  useEffect(() => {
    restoreAuth();
  }, [restoreAuth]);

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8f9fa', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '16px', color: '#666' }}>로딩 중...</div>
        <BottomNavigateBar />
      </div>
    );
  }

  const renderMyPageContent = () => {
    // TODO: 테스트를 위한 임시 코드 나중에 꼭 삭제!
    // return <RegularUserMyPage user={user} />;
    // return <PremiumUserMyPage user={user} />;

    if (!isAuthenticated || isGuest) {
      return <GuestMyPage />;
    }
    
    if (isPremium) {
      return <PremiumUserMyPage user={user} />;
    }
    
    if (isRegularUser) {
      return <RegularUserMyPage user={user} />;
    }
    
    return <GuestMyPage />;
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      paddingBottom: '80px'
    }}>
      {renderMyPageContent()}
      <BottomNavigateBar />
    </div>
  );
}
