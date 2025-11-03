import { useQuery } from '@tanstack/react-query';
import { newsRepository } from '@/repositories/newsRepository';
import type { NewsDetail } from '@/types/news/news-detail';

export type { NewsDetail };

export function useNewsDetail(id: string) {
  return useQuery({
    queryKey: ['news', 'detail', id],
    queryFn: () => newsRepository.getNewsDetail(id),
    enabled: id != null,
  });
}
