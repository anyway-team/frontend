'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const AuthInitializer = () => {
  const { restoreAuth } = useAuth();

  useEffect(() => {
    restoreAuth();
  }, [restoreAuth]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};
