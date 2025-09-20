import { News, UserStats } from '@/types/news';

export const mockSavedNews: News[] = [
  {
    id: '1',
    title: '블라블라 뉴스 내용 그래서 블라블라 뉴스 내용이...',
    summary: '조선일보',
    imageUrl: '/news-image-1.jpg',
    publishedAt: '20/12/12',
    source: '조선일보',
    category: '정치',
    isSaved: true,
  },
  {
    id: '2',
    title: '블라블라 뉴스 내용 그래서 블라블라 뉴스 내용이...',
    summary: '조선일보',
    imageUrl: '/news-image-2.jpg',
    publishedAt: '20/12/12',
    source: '조선일보',
    category: '정치',
    isSaved: true,
  },
];

export const mockUserStats: UserStats = {
  totalNewsRead: 42,
  totalNewsCompared: 18,
  favoriteNews: 7,
};
