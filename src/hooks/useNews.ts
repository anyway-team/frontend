import { useInfiniteQuery } from '@tanstack/react-query';
import { newsRepository } from '@/repositories/newsRepository';
import type { NewsResponse } from '@/repositories/newsRepository';

interface NewsItem {
  id: string;
  title: string;
  published_at: string;
  thumbnail_url: string;
  publisher: string;
}

interface NewsParams {
  page: number;
  size: number;
  keyword?: string;
}

const fetchNews = async ({ page = 0, size = 10, keyword }: NewsParams) => {
  const response = await fetch('https://cuteshrew.com/api/news', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ page, size, keyword }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  return response.json() as Promise<NewsResponse>;
};

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
