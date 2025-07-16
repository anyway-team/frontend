import { useInfiniteQuery } from '@tanstack/react-query';
import { newsRepository } from '@/repositories/newsRepository';

export function useNews(size: number = 10, keyword?: string) {
  return useInfiniteQuery({
    queryKey: ['news', keyword],
    queryFn: ({ pageParam = 0 }) => newsRepository.getNewsList({ page: pageParam, size, keyword }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.news.length === 0) {
        return undefined;
      }
      return allPages.length;
    },
  });
}
