import { atom } from 'jotai';
import { User, AuthState, UserRole } from '@/types/user';

// 초기 인증 상태
const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
} as const;

// 인증 상태 atom
export const authAtom = atom<AuthState>(initialAuthState);

// 사용자 역할 계산 atom
export const userRoleAtom = atom<UserRole>((get) => {
  const auth = get(authAtom);
  
  if (!auth.isAuthenticated || !auth.user) {
    return 'guest';
  }
  
  return auth.user.isPremium ? 'premium' : 'user';
});

// 로그인 상태 확인 atom
export const isAuthenticatedAtom = atom((get) => get(authAtom).isAuthenticated);

// 사용자 정보 atom
export const userAtom = atom((get) => get(authAtom).user);

// 프리미엄 사용자 여부 atom
export const isPremiumUserAtom = atom((get) => {
  const user = get(userAtom);
  return user?.isPremium ?? false;
});

// 로딩 상태 atom
export const authLoadingAtom = atom((get) => get(authAtom).isLoading);

// 에러 상태 atom
export const authErrorAtom = atom((get) => get(authAtom).error); 