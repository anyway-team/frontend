import { TodayNewsComparison } from './today-news-comparison';
import { NewsSummary } from './news-summary';

interface NewsHome {
  hot_keywords?: string[];
  today_comparisons?: TodayNewsComparison;
  today_news?: NewsSummary[];
}

export type { NewsHome };
