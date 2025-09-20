import { useAtom, useAtomValue } from 'jotai';
import { useCallback } from 'react';
import {
  authAtom,
  userRoleAtom,
  isAuthenticatedAtom,
  userAtom,
  isPremiumUserAtom,
  authLoadingAtom,
  authErrorAtom,
} from '@/stores/authStore';
import {
  loginActionAtom,
  logoutActionAtom,
  updateUserActionAtom,
  restoreAuthActionAtom,
  kakaoCallbackActionAtom,
  refreshTokenActionAtom,
} from '@/stores/authActions';
import { LoginCredentials, User } from '@/types/user';

export function useAuth() {
  const [auth] = useAtom(authAtom);
  const userRole = useAtomValue(userRoleAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const user = useAtomValue(userAtom);
  const isPremiumUser = useAtomValue(isPremiumUserAtom);
  const isLoading = useAtomValue(authLoadingAtom);
  const error = useAtomValue(authErrorAtom);

  const [, login] = useAtom(loginActionAtom);
  const [, logout] = useAtom(logoutActionAtom);
  const [, updateUser] = useAtom(updateUserActionAtom);
  const [, restoreAuth] = useAtom(restoreAuthActionAtom);
  const [, kakaoCallback] = useAtom(kakaoCallbackActionAtom);
  const [, refreshToken] = useAtom(refreshTokenActionAtom);

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await login(credentials);
      if (response != null) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, [login]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleUpdateUser = useCallback((updates: Partial<User>) => {
    updateUser(updates);
  }, [updateUser]);

  const handleRestoreAuth = useCallback(async () => {
    try {
      await restoreAuth();
    } catch (error) {
      console.error('Auth restoration failed:', error);
    }
  }, [restoreAuth]);

  const handleKakaoCallback = useCallback(async (accessToken: string, refreshToken: string) => {
    try {
      const response = await kakaoCallback({ accessToken, refreshToken });
      return response;
    } catch (error) {
      console.error('Kakao callback failed:', error);
      throw error;
    }
  }, [kakaoCallback]);

  const handleRefreshToken = useCallback(async () => {
    try {
      const response = await refreshToken();
      return response;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }, [refreshToken]);

  return {
    auth,
    userRole,
    isAuthenticated,
    user,
    isPremiumUser,
    isLoading,
    error,

    login: handleLogin,
    logout: handleLogout,
    updateUser: handleUpdateUser,
    restoreAuth: handleRestoreAuth,
    handleKakaoCallback,
    refreshToken: handleRefreshToken,

    isGuest: userRole === 'guest',
    isRegularUser: userRole === 'user',
    isPremium: userRole === 'premium',
  };
}
