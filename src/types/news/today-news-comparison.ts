import { NewsSummary } from './news-summary';

interface TodayNewsComparison {
  id: string;
  left_news_preview: NewsSummary;
  right_news_preview: NewsSummary;
}

export type { TodayNewsComparison };
