import { NewsDetail } from './news-detail';

interface NewsComparison {
  id: string;
  left_news: NewsDetail;
  right_news: NewsDetail;
}

export type { NewsComparison };
