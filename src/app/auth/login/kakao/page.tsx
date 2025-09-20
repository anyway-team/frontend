'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtom } from 'jotai';
import { kakaoCallbackActionAtom } from '@/stores/authActions';

function KakaoLoginCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, kakaoCallback] = useAtom(kakaoCallbackActionAtom);
  const processedRef = useRef(false);

  useEffect(() => {
    // 이미 처리되었다면 중복 실행 방지
    if (processedRef.current) return;

    const processKakaoCallback = async () => {
      processedRef.current = true;

      const accessToken = searchParams.get('accessToken');
      const refreshToken = searchParams.get('refreshToken');

      if (accessToken && refreshToken) {
        try {
          await kakaoCallback({ accessToken, refreshToken });
          // 로그인 성공 시 마이페이지로 리다이렉트
          router.replace('/my');
        } catch (error) {
          console.error('카카오 로그인 처리 실패:', error);
          // 실패 시 홈으로 리다이렉트
          router.replace('/');
        }
      } else {
        console.error('토큰 정보가 없습니다.');
        router.replace('/');
      }
    };

    processKakaoCallback();
    // 의존성 배열을 비워서 한 번만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #333',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <div style={{ fontSize: '16px', color: '#666' }}>카카오 로그인 처리 중...</div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default function KakaoLoginCallback() {
  return (
    <Suspense
      fallback={
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
        </div>
      }
    >
      <KakaoLoginCallbackContent />
    </Suspense>
  );
}
