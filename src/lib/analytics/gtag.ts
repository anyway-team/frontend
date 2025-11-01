/**
 * Google Analytics gtag 유틸리티
 *
 * gtag.js API를 타입 안전하게 사용하기 위한 래퍼 함수들
 */

import { GA_CONFIG, DEBUG_GA } from './config';

// gtag 전역 함수 타입 정의
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * 페이지뷰 이벤트 전송
 */
export function pageview(url: string): void {
  if (!GA_CONFIG.enabled) {
    if (DEBUG_GA) {
      console.log('[GA Debug] Pageview:', url);
    }
    return;
  }

  window.gtag('config', GA_CONFIG.measurementId, {
    page_path: url,
  });
}

/**
 * 커스텀 이벤트 전송
 */
export function event(action: string, params?: Record<string, unknown>): void {
  if (!GA_CONFIG.enabled) {
    if (DEBUG_GA) {
      console.log('[GA Debug] Event:', action, params);
    }
    return;
  }

  window.gtag('event', action, params);
}

/**
 * 사용자 속성 설정
 */
export function setUserProperties(properties: Record<string, unknown>): void {
  if (!GA_CONFIG.enabled) {
    if (DEBUG_GA) {
      console.log('[GA Debug] User Properties:', properties);
    }
    return;
  }

  window.gtag('set', 'user_properties', properties);
}
