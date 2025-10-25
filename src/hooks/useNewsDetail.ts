import { useQuery } from '@tanstack/react-query';
import { newsRepository } from '@/repositories/newsRepository';

export interface NewsDetail {
  id: string;
  title: string;
  published_at: string;
  source: string;
  thumbnail_url?: string;
  summary: string[];
  bias_score: {
    progressive: number;
    conservative: number;
    reasoning: string;
  };
  good_comment: string;
  bad_comment: string;
  origin_url: string;
  is_pick?: boolean;
}

export function useNewsDetail(id: string) {
  return useQuery({
    queryKey: ['news', 'detail', id],
    queryFn: () => newsRepository.getNewsDetail(id),
    enabled: id != null,
  });
}
