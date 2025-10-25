import { NewsDetail } from './news-detail';

interface NewsComparison {
  id: string;
  left_news_preview: NewsDetail;
  right_news_preview: NewsDetail;
}

export type { NewsComparison };
