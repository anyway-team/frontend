import { atom } from 'jotai';
import { authAtom } from './authStore';
import { User, LoginCredentials, LoginResponse } from '@/types/user';

// 로그인 액션
export const loginActionAtom = atom(
  null,
  async (get, set, credentials: LoginCredentials) => {
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
  }
);

// 로그아웃 액션
export const logoutActionAtom = atom(
  null,
  (get, set) => {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('auth_token');
    
    // 인증 상태 초기화
    set(authAtom, {
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    });
  }
);

// 사용자 정보 업데이트 액션
export const updateUserActionAtom = atom(
  null,
  (get, set, updates: Partial<User>) => {
    const currentAuth = get(authAtom);
    
    if (currentAuth.user) {
      set(authAtom, {
        ...currentAuth,
        user: { ...currentAuth.user, ...updates },
      });
    }
  }
);

// 초기 인증 상태 복원 액션 (앱 시작 시)
export const restoreAuthActionAtom = atom(
  null,
  async (get, set) => {
    const token = localStorage.getItem('auth_token');
    
    if (token) {
      try {
        // TODO: 실제 API 호출로 대체
        // const user = await authAPI.getCurrentUser();
        
        // 임시로 목업 데이터 사용
        const mockUser: User = {
          id: '1',
          email: 'user@example.com',
          name: '테스트 사용자',
          isPremium: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set(authAtom, {
          isAuthenticated: true,
          user: mockUser,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        // 토큰이 유효하지 않으면 제거
        localStorage.removeItem('auth_token');
        set(authAtom, {
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: null,
        });
      }
    }
  }
); 