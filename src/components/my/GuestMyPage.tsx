'use client';

import { redirectToKakaoLogin } from '@/services/authService';

export function GuestMyPage() {
  const handleKakaoLogin = () => {
    redirectToKakaoLogin();
  };
  return (
    <div style={{ padding: '20px' }}>
      {/* 헤더 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '40px',
        paddingTop: '20px'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#a8b3ff',
          marginRight: '16px'
        }} />
        <div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
            비회원
          </div>
        </div>
      </div>

      {/* 회원님이 저장한 뉴스 섹션 */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px'
        }}>
          회원님이 저장한 뉴스
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '60px 20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '8px',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            🔒
          </div>
          <div style={{
            fontSize: '14px',
            color: '#999',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            로그인 후에 이용할 수 있어요
          </div>
        </div>

        <button
          onClick={handleKakaoLogin}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#FEE500',
            color: '#000000',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '18px' }}>💬</span>
          카카오로 30초만에 로그인하기
        </button>
      </div>

      {/* 하단 메뉴 */}
      <div style={{ marginTop: '40px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '12px',
          marginBottom: '12px',
          cursor: 'pointer'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#a8b3ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '16px'
          }}>
            📢
          </div>
          <div style={{ fontSize: '16px', fontWeight: '500', color: '#333', flex: 1 }}>
            공지사항 보러가기
          </div>
          <div style={{ fontSize: '18px', color: '#999' }}>›</div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '12px',
          cursor: 'pointer'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#a8b3ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '16px'
          }}>
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
