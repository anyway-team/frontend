import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { newsRepository } from '@/repositories/newsRepository';

interface NewsComparison {
  id: string;
  left_news: News;
  right_news: News;
}

interface News {
  id: string;
  title: string;
  published_at: string;
  source: string;
  thumbnail_url?: string;
  summary: string[];
  bias_score: {
    progressive: number;
    conservative: number;
    reason: string;
  };
  good_comment: string;
  bad_comment: string;
}

function useNewsComparison(id: string): UseQueryResult<NewsComparison, Error> {
  return useQuery({
    queryKey: ['news', 'comparison', id],
    queryFn: () => newsRepository.getNewsComparison(id),
    enabled: !!id,
  });
}

export { type NewsComparison, type News, useNewsComparison };