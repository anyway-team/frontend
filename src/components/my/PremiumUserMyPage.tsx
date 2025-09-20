'use client';

import { mockUserStats, mockSavedNews } from '@/data/mockData';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';

interface PremiumUserMyPageProps {
  user: User;
}

export function PremiumUserMyPage({ user }: PremiumUserMyPageProps) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logout();
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
          marginBottom: '30px',
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
              position: 'relative',
            }}
          >
            👤
            <div
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '20px',
                height: '20px',
                backgroundColor: '#fbbf24',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
              }}
            >
              👑
            </div>
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
              {user?.name || '사용자'}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>프리미엄 회원</div>
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

      {/* 프리미엄 회원 안내 */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
          fontSize: '14px',
          color: '#666',
          textAlign: 'center',
        }}
      >
        프리미엄 회원이라 아래 서비스를 누리고 있어요
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
          marginBottom: '30px',
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

      {/* 홍길동님이 저장한 뉴스 */}
      <div style={{ marginBottom: '30px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            {user?.name || '사용자'}님이 저장한 뉴스
          </div>
          <button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#6366f1',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            View All
          </button>
        </div>

        {/* 뉴스 목록 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {mockSavedNews.slice(0, 2).map((news, index) => (
            <div
              key={news.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                gap: '12px',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  backgroundColor: index === 0 ? '#ff6b6b' : '#4dabf7',
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '4px',
                  }}
                >
                  {news.source}
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#333',
                    lineHeight: '1.4',
                    marginBottom: '8px',
                  }}
                >
                  {news.title}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#999',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  📅 {news.publishedAt}
                </div>
              </div>
            </div>
          ))}
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
