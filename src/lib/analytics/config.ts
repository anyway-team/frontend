/**
 * Google Analytics 설정
 */

export const GA_CONFIG = {
  measurementId: process.env.NEXT_PUBLIC_GA_ID || '',
  enabled: process.env.NODE_ENV === 'production' && !!process.env.NEXT_PUBLIC_GA_ID,
} as const;

/**
 * GA ID가 설정되어 있는지 확인
 */
export function isGAEnabled(): boolean {
  return GA_CONFIG.enabled && GA_CONFIG.measurementId.startsWith('G-');
}

/**
 * 개발 환경에서 GA 로그 출력 여부
 */
export const DEBUG_GA = process.env.NODE_ENV === 'development';
