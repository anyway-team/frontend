import { BiasScore } from './bias-score';

interface NewsDetail {
  id: string;
  title: string;
  published_at: string;
  source: string;
  summary: string[];
  bias_score: BiasScore;
  good_comment: string;
  bad_comment: string;
  is_pick?: boolean;
  thumbnail_url?: string;
  origin_url: string;
}

export type { NewsDetail };
