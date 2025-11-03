/**
 * 타입 안전한 이벤트 추적 함수
 */

import * as gtag from './gtag';
import type { EventName, EventParams } from './events';

/**
 * 타입 안전한 이벤트 추적
 *
 * @example
 * trackEvent('news_card_click', {
 *   news_id: '123',
 *   news_title: '뉴스 제목',
 *   publisher: '언론사',
 * });
 */
export function trackEvent<T extends EventName>(eventName: T, params: EventParams<T>): void {
  gtag.event(eventName, params as Record<string, unknown>);
}

/**
 * 페이지뷰 추적 (재export)
 */
export const trackPageview = gtag.pageview;

/**
 * 사용자 속성 설정 (재export)
 */
export const setUserProperties = gtag.setUserProperties;

/**
 * 뉴스 카드 클릭 추적 (헬퍼 함수)
 */
export function trackNewsCardClick(params: {
  newsId: string;
  title: string;
  publisher: string;
  category?: string;
}): void {
  trackEvent('news_card_click', {
    news_id: params.newsId,
    news_title: params.title,
    publisher: params.publisher,
    category: params.category,
  });
}

/**
 * 뉴스 상세 조회 추적 (헬퍼 함수)
 */
export function trackNewsDetailView(params: {
  newsId: string;
  title: string;
  publisher: string;
}): void {
  trackEvent('news_detail_view', {
    news_id: params.newsId,
    news_title: params.title,
    publisher: params.publisher,
  });
}

/**
 * 뉴스 비교 조회 추적 (헬퍼 함수)
 */
export function trackNewsComparisonView(params: {
  comparisonId: string;
  leftPublisher: string;
  rightPublisher: string;
}): void {
  trackEvent('news_comparison_view', {
    comparison_id: params.comparisonId,
    left_publisher: params.leftPublisher,
    right_publisher: params.rightPublisher,
  });
}

/**
 * 검색 추적 (헬퍼 함수)
 */
export function trackSearch(params: { keyword: string; resultsCount: number }): void {
  trackEvent('news_search', {
    search_keyword: params.keyword,
    results_count: params.resultsCount,
  });
}

/**
 * 로그인 성공 추적 (헬퍼 함수)
 */
export function trackLoginSuccess(userType: 'user' | 'premium'): void {
  trackEvent('login_success', {
    method: 'kakao',
    user_type: userType,
  });
}

/**
 * 로그아웃 추적 (헬퍼 함수)
 */
export function trackLogout(userType: 'user' | 'premium'): void {
  trackEvent('logout', {
    user_type: userType,
  });
}

/**
 * 뉴스 찜하기 추적 (헬퍼 함수)
 */
export function trackNewsPick(params: { newsId: string; title: string }): void {
  trackEvent('news_pick', {
    news_id: params.newsId,
    news_title: params.title,
  });
}

/**
 * 뉴스 찜 해제 추적 (헬퍼 함수)
 */
export function trackNewsUnpick(newsId: string): void {
  trackEvent('news_unpick', {
    news_id: newsId,
  });
}
