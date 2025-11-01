'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { setUserProperties } from '@/lib/analytics';

/**
 * 사용자 속성을 GA와 동기화하는 컴포넌트
 *
 * 로그인 상태가 변경될 때마다 GA에 사용자 속성을 업데이트합니다.
 */
export function UserPropertiesSync() {
  const { userRole, isAuthenticated, user } = useAuth();

  useEffect(() => {
    // 사용자 속성 설정
    setUserProperties({
      user_type: userRole, // 'guest' | 'user' | 'premium'
      is_authenticated: isAuthenticated,
      is_premium: userRole === 'premium',
    });

    // 로그인한 경우 추가 속성 설정
    if (isAuthenticated && user) {
      setUserProperties({
        user_id: user.id,
        user_type: userRole,
        is_premium: user.isPremium,
      });
    }
  }, [userRole, isAuthenticated, user]);

  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null;
}
