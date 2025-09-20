import { atom } from 'jotai';
import { authAtom } from './authStore';
import { User, LoginCredentials, LoginResponse } from '@/types/user';
import {
  processKakaoCallback,
  refreshAccessToken,
  logout as logoutService,
  getCurrentUser,
} from '@/services/authService';
import { clearPickStateActionAtom } from './newsPickActions';

// 로그인 액션
export const loginActionAtom = atom(null, async (get, set, credentials: LoginCredentials) => {
  const currentAuth = get(authAtom);

  // 로딩 상태 시작
  set(authAtom, { ...currentAuth, isLoading: true, error: null });

  try {
    // TODO: 실제 API 호출로 대체
    // const response = await authAPI.login(credentials);

    // 임시로 목업 데이터 사용
    const mockResponse: LoginResponse = {
      user: {
        id: '1',
        email: credentials.email,
        name: credentials.email.includes('kakao') ? '카카오 사용자' : '테스트 사용자',
        isPremium: credentials.email.includes('premium') || credentials.email.includes('kakao'),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'mock-token',
    };

    // 로컬 스토리지에 토큰 저장
    localStorage.setItem('auth_token', mockResponse.token);

    // 인증 상태 업데이트
    set(authAtom, {
      isAuthenticated: true,
      user: mockResponse.user,
      isLoading: false,
      error: null,
    });

    return mockResponse;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '로그인에 실패했습니다.';

    set(authAtom, {
      ...currentAuth,
      isLoading: false,
      error: errorMessage,
    });

    throw error;
  }
});

// 카카오 로그인 콜백 처리 액션
export const kakaoCallbackActionAtom = atom(
  null,
  async (
    get,
    set,
    { accessToken, refreshToken }: { accessToken: string; refreshToken: string }
  ) => {
    const currentAuth = get(authAtom);

    // 로딩 상태 시작
    set(authAtom, { ...currentAuth, isLoading: true, error: null });

    try {
      const response = await processKakaoCallback(accessToken, refreshToken);

      // 인증 상태 업데이트
      set(authAtom, {
        isAuthenticated: true,
        user: response.user,
        isLoading: false,
        error: null,
      });

      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '카카오 로그인에 실패했습니다.';

      set(authAtom, {
        ...currentAuth,
        isLoading: false,
        error: errorMessage,
      });

      throw error;
    }
  }
);

// 로그아웃 액션
export const logoutActionAtom = atom(null, async (get, set) => {
  try {
    await logoutService();
  } catch (error) {
    console.error('로그아웃 서비스 호출 실패:', error);
  } finally {
    // 인증 상태 초기화
    set(authAtom, {
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    });

    // 찜 상태도 초기화
    set(clearPickStateActionAtom);
  }
});

// 사용자 정보 업데이트 액션
export const updateUserActionAtom = atom(null, (get, set, updates: Partial<User>) => {
  const currentAuth = get(authAtom);

  if (currentAuth.user) {
    set(authAtom, {
      ...currentAuth,
      user: { ...currentAuth.user, ...updates },
    });
  }
});

// 토큰 갱신 액션
export const refreshTokenActionAtom = atom(null, async (get, set) => {
  try {
    const response = await refreshAccessToken();
    return response;
  } catch (error) {
    // 토큰 갱신 실패 시 로그아웃 처리
    set(authAtom, {
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    });
    throw error;
  }
});

// 초기 인증 상태 복원 액션 (앱 시작 시)
export const restoreAuthActionAtom = atom(null, async (get, set) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    try {
      const user = await getCurrentUser();

      if (user) {
        set(authAtom, {
          isAuthenticated: true,
          user,
          isLoading: false,
          error: null,
        });
      } else {
        // 사용자 정보를 가져올 수 없는 경우 로그아웃 처리
        set(authAtom, {
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      console.error('인증 상태 복원 실패:', error);
      set(authAtom, {
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
      });
    }
  } else {
    set(authAtom, {
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    });
  }
});
