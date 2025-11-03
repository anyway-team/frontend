# Google Analytics 가이드

## 📊 개요

이 프로젝트는 Google Analytics 4 (GA4)를 사용하여 사용자 행동을 추적합니다.

## 🚀 설정

### 1. 환경 변수 설정

`.env.local` 파일에 GA Measurement ID를 추가하세요:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 2. 자동 추적 기능

다음 항목들은 **자동으로 추적**됩니다:

- ✅ **페이지뷰** - 모든 페이지 이동
- ✅ **사용자 속성** - 로그인 상태, 사용자 타입 (게스트/일반/프리미엄)
- ✅ **스크롤 깊이** - 25%, 50%, 75%, 100% 지점
- ✅ **체류 시간** - 30초마다 페이지 체류 시간

## 📝 추적되는 이벤트

### 뉴스 관련

| 이벤트 이름 | 설명 | 파라미터 |
|------------|------|---------|
| `news_card_click` | 뉴스 카드 클릭 | `news_id`, `news_title`, `publisher`, `category?` |
| `news_detail_view` | 뉴스 상세 조회 | `news_id`, `news_title`, `publisher` |
| `news_comparison_view` | 뉴스 비교 조회 | `comparison_id`, `left_publisher`, `right_publisher` |
| `news_search` | 뉴스 검색 | `search_keyword`, `results_count` |
| `news_pick` | 뉴스 찜하기 | `news_id`, `news_title` |
| `news_unpick` | 뉴스 찜 해제 | `news_id` |

### 인증 관련

| 이벤트 이름 | 설명 | 파라미터 |
|------------|------|---------|
| `login_success` | 로그인 성공 | `method: 'kakao'`, `user_type: 'user' \| 'premium'` |
| `logout` | 로그아웃 | `user_type: 'user' \| 'premium'` |

### 사용자 행동

| 이벤트 이름 | 설명 | 파라미터 |
|------------|------|---------|
| `scroll_depth` | 스크롤 깊이 | `page_path`, `depth_percentage: 25\|50\|75\|100` |
| `page_engagement` | 페이지 체류 시간 | `page_path`, `engagement_time_seconds` |

## 💻 사용 방법

### 컴포넌트에서 사용

```typescript
import { useAnalytics } from '@/hooks/useAnalytics';

function MyComponent() {
  const { trackNewsCardClick } = useAnalytics();
  
  const handleClick = () => {
    trackNewsCardClick({
      newsId: '123',
      title: '뉴스 제목',
      publisher: '언론사',
    });
  };
  
  return <button onClick={handleClick}>뉴스 보기</button>;
}
```

### 일반 함수에서 사용

```typescript
import { trackEvent } from '@/lib/analytics';

function someFunction() {
  trackEvent('news_search', {
    search_keyword: '정치',
    results_count: 42,
  });
}
```

### 커스텀 이벤트 추가

1. `src/lib/analytics/events.ts`에 이벤트 타입 정의:

```typescript
export type MyCustomEvent = {
  name: 'my_custom_event';
  params: {
    custom_param: string;
  };
};

// AnalyticsEvent에 추가
export type AnalyticsEvent =
  | NewsEvent
  | AuthEvent
  | MyCustomEvent; // 추가
```

2. `src/lib/analytics/tracker.ts`에 헬퍼 함수 추가 (선택사항):

```typescript
export function trackMyCustomEvent(customParam: string): void {
  trackEvent('my_custom_event', {
    custom_param: customParam,
  });
}
```

3. 사용:

```typescript
import { trackMyCustomEvent } from '@/lib/analytics';

trackMyCustomEvent('test');
```

## 🔍 디버깅

### 개발 환경

개발 환경(`NODE_ENV=development`)에서는 실제 GA로 전송되지 않고 콘솔에 로그가 출력됩니다:

```
[GA Debug] Pageview: /home
[GA Debug] Event: news_card_click { news_id: '123', ... }
```

### 프로덕션 환경

프로덕션 빌드에서만 실제 GA로 데이터가 전송됩니다.

## 📈 GA에서 확인하기

1. [Google Analytics](https://analytics.google.com/) 접속
2. 보고서 > 이벤트 선택
3. 추적된 이벤트 확인

### 맞춤 보고서 만들기

1. 탐색 > 빈 보고서
2. 측정기준 추가: `이벤트 이름`, `페이지 경로`
3. 측정항목 추가: `이벤트 수`, `사용자 수`

## 🎯 권장 사항

### DO ✅

- 중요한 사용자 액션만 추적
- 명확하고 일관된 이벤트 이름 사용
- 타입 안전성 유지 (이벤트 타입 정의)

### DON'T ❌

- 개인정보(이메일, 전화번호 등) 전송 금지
- 과도한 이벤트 추적 (성능 저하)
- 하드코딩된 이벤트 이름 사용

## 🔒 개인정보 보호

- 사용자 ID는 익명화된 형태로만 전송
- 개인식별정보(PII)는 절대 전송하지 않음
- GDPR 및 개인정보보호법 준수

## 📚 참고 자료

- [Google Analytics 4 문서](https://support.google.com/analytics/answer/9304153)
- [GA4 이벤트 가이드](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
