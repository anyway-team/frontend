/**
 * 스크롤 깊이 추적 훅
 *
 * 사용자가 페이지를 얼마나 스크롤했는지 추적합니다.
 * 25%, 50%, 75%, 100% 지점에 도달하면 이벤트를 전송합니다.
 */

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;

export function useScrollDepth() {
  const pathname = usePathname();
  const reachedThresholds = useRef<Set<number>>(new Set());

  useEffect(() => {
    // 페이지 변경 시 추적 상태 초기화
    reachedThresholds.current.clear();

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // 스크롤 가능한 높이
      const scrollableHeight = documentHeight - windowHeight;

      if (scrollableHeight <= 0) return;

      // 현재 스크롤 비율 계산
      const scrollPercentage = Math.round((scrollTop / scrollableHeight) * 100);

      // 각 임계값에 도달했는지 확인
      SCROLL_THRESHOLDS.forEach((threshold) => {
        if (scrollPercentage >= threshold && !reachedThresholds.current.has(threshold)) {
          reachedThresholds.current.add(threshold);

          // GA 이벤트 전송
          trackEvent('scroll_depth', {
            page_path: pathname,
            depth_percentage: threshold,
          });
        }
      });
    };

    // 스크롤 이벤트 리스너 등록 (throttle 적용)
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [pathname]);
}
