import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/api';

export interface HomeData {
  hot_keywords?: string[];
  today_comparisons?: {
    id: string;
    left_news_preview: {
      title: string;
      publisher: string;
      thumbnail_url?: string;
    };
    right_news_preview: {
      title: string;
      publisher: string;
      thumbnail_url?: string;
    };
  };
  today_news?: Array<{
    id: string;
    title: string;
    published_at: string;
    thumbnail_url: string;
    publisher: string;
  }>;
}

export function useHomeData() {
  return useQuery<HomeData>({
    queryKey: ['/api/home'],
    queryFn: async () => {
      const res = await axios.get(API_ENDPOINTS.HOME);
      return res.data;
    },
    // 에러가 발생해도 빈 객체를 반환하여 UI가 완전히 깨지지 않도록 함
    retry: 2,
    retryDelay: 1000,
  });
} 