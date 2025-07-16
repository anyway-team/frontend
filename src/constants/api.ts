export const API_BASE_URL = 'https://newsbee.co.kr';

export const API_ENDPOINTS = {
  NEWS: {
    LIST: `${API_BASE_URL}/api/news`,
    DETAIL: (id: string) => `${API_BASE_URL}/api/news/${id}`,
    COMPARISON: (id: string) => `${API_BASE_URL}/api/news/comparisons/${id}`,
  },
  HOME: `${API_BASE_URL}/api/home`,
} as const; 