/**
 * 페이지 체류 시간 추적 훅
 *
 * 사용자가 페이지에 머문 시간을 추적합니다.
 * 페이지를 떠날 때 또는 일정 시간마다 이벤트를 전송합니다.
 */

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

const ENGAGEMENT_INTERVAL = 30000; // 30초마다 체류 시간 전송

export function usePageEngagement() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 페이지 진입 시간 기록
    startTimeRef.current = Date.now();

    // 일정 시간마다 체류 시간 전송
    const sendEngagementTime = () => {
      const engagementTime = Math.round((Date.now() - startTimeRef.current) / 1000);

      if (engagementTime > 0) {
        trackEvent('page_engagement', {
          page_path: pathname,
          engagement_time_seconds: engagementTime,
        });
      }
    };

    // 30초마다 체류 시간 전송
    intervalRef.current = setInterval(sendEngagementTime, ENGAGEMENT_INTERVAL);

    // 페이지를 떠날 때 최종 체류 시간 전송
    const handleBeforeUnload = () => {
      sendEngagementTime();
    };

    // 페이지 가시성 변경 시 (탭 전환 등)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        sendEngagementTime();
      } else {
        // 다시 돌아왔을 때 시작 시간 재설정
        startTimeRef.current = Date.now();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      // 클린업: 마지막 체류 시간 전송
      sendEngagementTime();

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname]);
}
