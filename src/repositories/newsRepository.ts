import { API_ENDPOINTS } from '@/constants/api';
import { NewsComparison } from '@/hooks/useNewsComparison';
import { apiClient } from '@/services/apiClient';

export interface NewsItem {
  id: string;
  title: string;
  published_at: string;
  thumbnail_url: string;
  publisher: string;
}

export interface NewsResponse {
  news: NewsItem[];
}

export interface NewsParams {
  page: number;
  size: number;
  keyword?: string;
}

class NewsRepository {
  async getNewsList({ page = 0, size = 10, keyword }: NewsParams): Promise<NewsResponse> {
    const requestData: { page: number; size: number; keyword?: string } = {
      page,
      size,
    };
    
    if (keyword) {
      requestData.keyword = keyword;
    }

    return await apiClient.post<NewsResponse>(API_ENDPOINTS.NEWS.LIST, requestData, {
      skipAuth: true, // 뉴스 목록은 인증이 필요하지 않음
    });
  }

  async getNewsDetail(id: string) {
    // 로그인 상태에 따라 토큰 포함 여부 결정
    const accessToken = localStorage.getItem('accessToken');
    
    return await apiClient.get(API_ENDPOINTS.NEWS.DETAIL(id), {
      skipAuth: !accessToken, // 토큰이 있으면 인증 헤더 포함, 없으면 제외
    });
  }

  async getNewsComparison(id: string): Promise<NewsComparison> {
    return await apiClient.get<NewsComparison>(API_ENDPOINTS.NEWS.COMPARISON(id), {
      skipAuth: true, // 뉴스 비교는 인증이 필요하지 않음
    });
  }
}

export const newsRepository = new NewsRepository();
