'use client';

import { mockUserStats } from '@/data/mockData';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';

interface RegularUserMyPageProps {
  user: User;
}

export function RegularUserMyPage({ user }: RegularUserMyPageProps) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      await logout();
    }
  };

  const handleGoToSavedNews = () => {
    router.push('/my/saved-news');
  };

  const handleGoToHome = () => {
    router.push('/');
  };
  return (
    <div style={{ padding: '20px' }}>
      {/* 헤더 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          paddingTop: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#6366f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px',
              fontSize: '24px',
            }}
          >
            👤
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
              {user?.name || '사용자'}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>일반 회원</div>
          </div>
        </div>
        <div
          onClick={handleLogout}
          style={{ fontSize: '24px', color: '#666', cursor: 'pointer' }}
          title="로그아웃"
        >
          🚪
        </div>
      </div>

      {/* 찜한 뉴스 보기 버튼 */}
      <button
        onClick={handleGoToSavedNews}
        style={{
          width: '100%',
          padding: '16px',
          backgroundColor: 'white',
          color: '#333',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ marginRight: '8px' }}>💾</span>
        찜한 뉴스 보기
      </button>

      {/* 통계 섹션 */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '40px',
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>
            {mockUserStats.totalNewsRead}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>읽은 뉴스</div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>
            {mockUserStats.totalNewsCompared}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>비교한 뉴스</div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>
            {mockUserStats.favoriteNews}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>저장한 뉴스</div>
        </div>
      </div>

      {/* 하단 메뉴 */}
      <div>
        <div
          onClick={handleGoToHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '12px',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#a8b3ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px',
            }}
          >
            ⭐
          </div>
          <div style={{ fontSize: '16px', fontWeight: '500', color: '#333', flex: 1 }}>
            서비스 소개 보러가기
          </div>
          <div style={{ fontSize: '18px', color: '#999' }}>›</div>
        </div>
      </div>
    </div>
  );
}
