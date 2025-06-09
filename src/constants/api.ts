export const API_BASE_URL = 'https://cuteshrew.com';

export const API_ENDPOINTS = {
  NEWS: {
    LIST: `${API_BASE_URL}/api/news`,
    DETAIL: (id: string) => `${API_BASE_URL}/api/news/${id}`,
    COMPARISON: (id: string) => `${API_BASE_URL}/api/news/comparisons/${id}`,
  },
} as const; 