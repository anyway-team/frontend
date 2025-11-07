'use client';

import { redirectToKakaoLogin } from '@/services/authService';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function GuestMyPage() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    redirectToKakaoLogin();
  };

  const handleGoToIntroduce = () => {
    router.push('/introduce');
  };
  return (
    <div style={{ padding: '20px' }}>
      {/* 회원님이 저장한 뉴스 섹션 */}
      <div style={{ marginBottom: '40px' }}>
        <div
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '20px',
          }}
        >
          내가 저장한 뉴스
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '60px 20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: '#999',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            로그인 후에 이용할 수 있어요
          </div>
        </div>

        <Image
          className="cursor-pointer"
          onClick={handleKakaoLogin}
          src="/kakao-login.png"
          alt="kakao"
          width={380}
          height={40}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      {/* 하단 메뉴 */}
      <div style={{ marginTop: '40px' }}>
        <div
          onClick={handleGoToIntroduce}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '12px',
            cursor: 'pointer',
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: '500', color: '#333', flex: 1 }}>
            서비스 소개 보러가기
          </div>
          <div style={{ fontSize: '18px', color: '#999' }}>›</div>
        </div>
      </div>
    </div>
  );
}
