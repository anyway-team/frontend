'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { GA_CONFIG, isGAEnabled } from '@/lib/analytics/config';
import { pageview } from '@/lib/analytics/gtag';

/**
 * Google Analytics 컴포넌트
 *
 * - GA 스크립트 로드
 * - 자동 페이지뷰 추적
 * - 라우트 변경 감지
 */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 라우트 변경 시 페이지뷰 전송
  useEffect(() => {
    if (!isGAEnabled()) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    pageview(url);
  }, [pathname, searchParams]);

  // GA가 비활성화되어 있으면 스크립트 로드하지 않음
  if (!isGAEnabled()) {
    return null;
  }

  return (
    <>
      {/* Google Analytics 스크립트 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_CONFIG.measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_CONFIG.measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
