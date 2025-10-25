import { NewsComparison } from './news-comparison';
import { NewsSummary } from './news-summary';

interface NewsHome {
  hot_keywords: string[];
  today_comparisons: NewsComparison | null;
  today_news: NewsSummary[];
}

export type { NewsHome };
