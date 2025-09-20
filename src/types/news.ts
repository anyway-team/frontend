export interface News {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
  category: string;
  isSaved?: boolean;
}

export interface UserStats {
  totalNewsRead: number;
  totalNewsCompared: number;
  favoriteNews: number;
}
