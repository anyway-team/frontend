import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_ENDPOINTS } from '@/constants/api';
import { NewsHome } from '@/types/news/news-home';

export function useHomeData() {
  return useQuery<NewsHome>({
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
