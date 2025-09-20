'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export const KakaoLogin = () => {
  const { login, isLoading, error } = useAuth();
  const [isKakaoLoading, setIsKakaoLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleKakaoLogin = async () => {
    setIsKakaoLoading(true);
    
    try {
      // TODO: 실제 카카오 로그인 API 연동 시 이 부분을 수정
      // 1. 카카오 인증 페이지로 리다이렉트
      // 2. 카카오에서 인증 완료 후 콜백으로 사용자 정보 받기
      // 3. 받은 정보로 서버에 로그인 요청
      
      // 현재는 목업으로 카카오 로그인 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500)); // 로딩 효과
      
      // 목업 카카오 사용자 정보
      const mockKakaoUser = {
        email: 'kakao_user@example.com',
        password: 'kakao_oauth', // 실제로는 OAuth 토큰 사용
      };
      
      // 랜덤하게 프리미엄 사용자 생성 (테스트용)
      const randomPremium = Math.random() > 0.5;
      if (randomPremium) {
        mockKakaoUser.email = 'kakao_premium@example.com';
      }
      
      const success = await login(mockKakaoUser);
      
      if (success) {
        setLoginSuccess(true);
        // 잠시 후 성공 메시지 숨기기
        setTimeout(() => setLoginSuccess(false), 3000);
      }
      
    } catch (error) {
      console.error('Kakao login failed:', error);
    } finally {
      setIsKakaoLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {error && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}
      
      {loginSuccess && (
        <div className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-lg">
          🎉 카카오 로그인에 성공했습니다!
        </div>
      )}
      
      <div className="text-center space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            로그인
          </h2>
          <p className="text-sm text-gray-600">
            카카오 계정으로 간편하게 로그인하세요
          </p>
        </div>
        
        <Button
          onClick={handleKakaoLogin}
          disabled={isKakaoLoading || isLoading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {isKakaoLoading || isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <span>로그인 중...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-lg">🎯</span>
              <span>카카오로 로그인</span>
            </div>
          )}
        </Button>
        
        <div className="text-xs text-gray-500">
          <p>• 개인정보 보호를 위해 최소한의 정보만 수집합니다</p>
          <p>• 로그인 시 서비스 이용약관과 개인정보처리방침에 동의합니다</p>
        </div>
      </div>
      
      {/* 개발용 테스트 계정 정보 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 text-center mb-2">
          🧪 개발 테스트용 (실제 카카오 로그인 구현 시 제거)
        </p>
        <div className="text-xs text-gray-500 space-y-1">
          <p>• 카카오 로그인 버튼 클릭 시 자동으로 로그인됩니다</p>
          <p>• 테스트용 목업 데이터로 로그인됩니다</p>
        </div>
      </div>
    </div>
  );
};
