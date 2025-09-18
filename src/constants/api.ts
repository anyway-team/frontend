export const API_BASE_URL = 'https://newsbee.co.kr';

export const API_ENDPOINTS = {
  AUTH: {
    KAKAO_LOGIN: `${API_BASE_URL}/oauth2/authorization/kakao`,
    REFRESH: `${API_BASE_URL}/api/auth/refresh`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  },
  NEWS: {
    LIST: `${API_BASE_URL}/api/news`,
    DETAIL: (id: string) => `${API_BASE_URL}/api/news/${id}`,
    COMPARISON: (id: string) => `${API_BASE_URL}/api/news/comparisons/${id}`,
    PICK: `${API_BASE_URL}/api/news/pick`,
    PICK_LIST: `${API_BASE_URL}/api/news/list/pick`,
    UNPICK: (newsId: string) => `${API_BASE_URL}/api/news/${newsId}`,
  },
  HOME: `${API_BASE_URL}/api/home`,
} as const; 