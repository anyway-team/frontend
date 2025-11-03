# NewsBee: 초보자 친화적 정치 뉴스비교 플랫폼

## 실행 방법

```bash
pnpm run dev
```

## 빌드 방법

```bash
pnpm run build
```

## 도움이 되는 명령어

```bash
pnpm tsc --noEmit --watch
pnpm tsc --noEmit
```

## .env 설정

### 로컬 개발 환경

`.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```bash
# Google Analytics Measurement ID
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### AWS Amplify 배포 환경

AWS Amplify Console에서 환경 변수를 설정해야 합니다:

1. AWS Amplify Console 접속
2. 해당 앱 선택
3. 좌측 메뉴에서 **"Environment variables"** 클릭
4. **"Manage variables"** 버튼 클릭
5. 환경 변수 추가:
   - Variable: `NEXT_PUBLIC_GA_ID`
   - Value: `G-XXXXXXXXXX` (실제 구글 애널리틱스 ID)

> 💡 빌드 로그에서 `Building with GA_ID=G-XXXXXXXXXX` 메시지를 확인하여 환경 변수가 제대로 설정되었는지 확인할 수 있습니다.

## 📊 Analytics

이 프로젝트는 Google Analytics 4를 사용하여 사용자 행동을 추적합니다.

자세한 내용은 [Analytics 가이드](./docs/ANALYTICS.md)를 참고하세요.

### 자동 추적 기능

- ✅ 페이지뷰
- ✅ 사용자 속성 (게스트/일반/프리미엄)
- ✅ 스크롤 깊이 (25%, 50%, 75%, 100%)
- ✅ 페이지 체류 시간

### 주요 이벤트

- 뉴스 카드 클릭
- 뉴스 상세 조회
- 뉴스 비교 조회
- 로그인/로그아웃
- 뉴스 찜하기/해제
