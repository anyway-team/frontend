import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { newsRepository } from '@/repositories/newsRepository';
import type { NewsComparison } from '@/types/news/news-comparison';

function useNewsComparison(id: string): UseQueryResult<NewsComparison, Error> {
  return useQuery({
    queryKey: ['news', 'comparison', id],
    queryFn: () => newsRepository.getNewsComparison(id),
    enabled: id != null,
  });
}

export { useNewsComparison };
