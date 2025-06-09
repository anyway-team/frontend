import { API_ENDPOINTS } from '@/constants/api';

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
    const response = await fetch(API_ENDPOINTS.NEWS.LIST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page, size, keyword }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    return response.json();
  }

  async getNewsDetail(id: string) {
    const response = await fetch(API_ENDPOINTS.NEWS.DETAIL(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch news detail');
    }

    return response.json();
  }

  async getNewsComparison(id: string) {
    const response = await fetch(API_ENDPOINTS.NEWS.COMPARISON(id), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch news comparison');
    }

    return response.json();
  }
}

export const newsRepository = new NewsRepository();
