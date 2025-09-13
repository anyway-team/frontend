import { useAtom, useAtomValue } from 'jotai';
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

  const handleLogin = async (credentials: LoginCredentials) => {
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
  };

  const handleLogout = () => {
    logout();
  };

  const handleUpdateUser = (updates: Partial<User>) => {
    updateUser(updates);
  };

  const handleRestoreAuth = async () => {
    try {
      await restoreAuth();
    } catch (error) {
      console.error('Auth restoration failed:', error);
    }
  };

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

    isGuest: userRole === 'guest',
    isRegularUser: userRole === 'user',
    isPremium: userRole === 'premium',
  };
}
