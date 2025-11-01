/**
 * Analytics 모듈 통합 export
 */

// 설정
export { GA_CONFIG, isGAEnabled, DEBUG_GA } from './config';

// gtag 함수들
export * as gtag from './gtag';

// 이벤트 타입
export type { AnalyticsEvent, EventName, EventParams } from './events';

// 추적 함수들
export {
  trackEvent,
  trackPageview,
  setUserProperties,
  trackNewsCardClick,
  trackNewsDetailView,
  trackNewsComparisonView,
  trackSearch,
  trackLoginSuccess,
  trackLogout,
  trackNewsPick,
  trackNewsUnpick,
} from './tracker';
