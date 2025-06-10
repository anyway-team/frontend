import { useQuery } from '@tanstack/react-query';
import { newsRepository } from '@/repositories/newsRepository';

export interface NewsDetail {
  id: string;
  title: string;
  published_at: string;
  source: string;
  summary: string[];
  bias_score: {
    progressive: number;
    conservative: number;
    reason: string;
  };
  good_comment: string;
  bad_comment: string;
}

export function useNewsDetail(id: string) {
  return useQuery({
    queryKey: ['news', 'detail', id],
    queryFn: () => newsRepository.getNewsDetail(id),
    enabled: !!id,
  });
} 