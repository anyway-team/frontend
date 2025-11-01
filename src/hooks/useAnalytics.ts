/**
 * Analytics 커스텀 훅
 *
 * 컴포넌트에서 쉽게 이벤트를 추적할 수 있도록 하는 훅
 */

import { useCallback } from 'react';
import type { EventName, EventParams } from '@/lib/analytics/events';
import * as tracker from '@/lib/analytics/tracker';

export function useAnalytics() {
  /**
   * 범용 이벤트 추적
   */
  const trackEvent = useCallback(<T extends EventName>(eventName: T, params: EventParams<T>) => {
    tracker.trackEvent(eventName, params);
  }, []);

  /**
   * 뉴스 카드 클릭 추적
   */
  const trackNewsCardClick = useCallback(
    (params: { newsId: string; title: string; publisher: string; category?: string }) => {
      tracker.trackNewsCardClick(params);
    },
    []
  );

  /**
   * 뉴스 상세 조회 추적
   */
  const trackNewsDetailView = useCallback(
    (params: { newsId: string; title: string; publisher: string }) => {
      tracker.trackNewsDetailView(params);
    },
    []
  );

  /**
   * 뉴스 비교 조회 추적
   */
  const trackNewsComparisonView = useCallback(
    (params: { comparisonId: string; leftPublisher: string; rightPublisher: string }) => {
      tracker.trackNewsComparisonView(params);
    },
    []
  );

  /**
   * 검색 추적
   */
  const trackSearch = useCallback((params: { keyword: string; resultsCount: number }) => {
    tracker.trackSearch(params);
  }, []);

  /**
   * 로그인 성공 추적
   */
  const trackLoginSuccess = useCallback((userType: 'user' | 'premium') => {
    tracker.trackLoginSuccess(userType);
  }, []);

  /**
   * 로그아웃 추적
   */
  const trackLogout = useCallback((userType: 'user' | 'premium') => {
    tracker.trackLogout(userType);
  }, []);

  /**
   * 뉴스 찜하기 추적
   */
  const trackNewsPick = useCallback((params: { newsId: string; title: string }) => {
    tracker.trackNewsPick(params);
  }, []);

  /**
   * 뉴스 찜 해제 추적
   */
  const trackNewsUnpick = useCallback((newsId: string) => {
    tracker.trackNewsUnpick(newsId);
  }, []);

  return {
    trackEvent,
    trackNewsCardClick,
    trackNewsDetailView,
    trackNewsComparisonView,
    trackSearch,
    trackLoginSuccess,
    trackLogout,
    trackNewsPick,
    trackNewsUnpick,
  };
}
