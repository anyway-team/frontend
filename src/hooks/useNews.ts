import { useInfiniteQuery } from '@tanstack/react-query';

interface NewsItem {
  id: string;
  title: string;
  published_at: string;
  thumbnail_url: string;
  publisher: string;
}

interface NewsResponse {
  news: NewsItem[];
}

interface NewsParams {
  page: number;
  size: number;
  keyword?: string;
}

const fetchNews = async ({ page, size, keyword }: NewsParams) => {
  const response = await fetch('https://34.64.170.41/api/news', {
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
    queryFn: ({ pageParam = 1 }) => fetchNews({ page: pageParam, size, keyword }),
    getNextPageParam: (_, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage;
    },
  });
}
