import { API_ENDPOINTS } from '@/constants/api';
import { User } from '@/types/user';

export interface KakaoLoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// 카카오 로그인 페이지로 리다이렉트
export const redirectToKakaoLogin = () => {
  window.location.href = API_ENDPOINTS.AUTH.KAKAO_LOGIN;
};

// 카카오 콜백 처리 (토큰으로 사용자 정보 가져오기)
export const processKakaoCallback = async (
  accessToken: string,
  refreshToken: string
): Promise<KakaoLoginResponse> => {
  try {
    // 토큰을 localStorage에 저장
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    // 사용자 정보를 가져오기 위해 API 호출 (임시로 목업 데이터 사용)
    // TODO: 실제 사용자 정보 API 호출로 대체
    const mockUser: User = {
      id: 'kakao_' + Date.now(),
      email: 'kakao@example.com',
      name: '카카오 사용자',
      profileImage: undefined,
      isPremium: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return {
      user: mockUser,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error('카카오 콜백 처리 실패:', error);
    throw new Error('카카오 로그인 처리에 실패했습니다.');
  }
};

// 토큰 갱신
export const refreshAccessToken = async (): Promise<RefreshTokenResponse> => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    throw new Error('리프레시 토큰이 없습니다.');
  }

  try {
    const response = await fetch(API_ENDPOINTS.AUTH.REFRESH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('토큰 갱신에 실패했습니다.');
    }

    const data: RefreshTokenResponse = await response.json();

    // 새로운 토큰들을 저장
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    // 리프레시 토큰도 만료된 경우 모든 토큰 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    throw error;
  }
};

// 로그아웃
export const logout = async (): Promise<void> => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    if (accessToken) {
      await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  } catch (error) {
    console.error('로그아웃 API 호출 실패:', error);
    // API 호출이 실패해도 로컬 토큰은 제거
  } finally {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

// 현재 사용자 정보 가져오기 (토큰 검증 포함)
export const getCurrentUser = async (): Promise<User | null> => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return null;
  }

  try {
    // TODO: 실제 사용자 정보 API 호출로 대체
    // 현재는 토큰이 있으면 목업 사용자 정보 반환
    const mockUser: User = {
      id: 'kakao_user',
      email: 'kakao@example.com',
      name: '카카오 사용자',
      profileImage: undefined,
      isPremium: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return mockUser;
  } catch (error) {
    console.error('사용자 정보 가져오기 실패:', error);
    // 토큰이 유효하지 않은 경우 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return null;
  }
};

// API 요청 시 사용할 Authorization 헤더 생성
export const getAuthHeaders = (): Record<string, string> => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return {};
};
