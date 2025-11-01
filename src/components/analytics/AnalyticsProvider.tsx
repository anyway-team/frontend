'use client';

import { useScrollDepth } from '@/hooks/useScrollDepth';
import { usePageEngagement } from '@/hooks/usePageEngagement';

/**
 * Analytics Provider
 *
 * 스크롤 깊이와 페이지 체류 시간을 자동으로 추적합니다.
 * 이 컴포넌트를 사용하면 모든 페이지에서 자동으로 추적이 활성화됩니다.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  // 스크롤 깊이 추적
  useScrollDepth();

  // 페이지 체류 시간 추적
  usePageEngagement();

  return <>{children}</>;
}
