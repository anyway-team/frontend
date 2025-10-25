interface BiasScore {
  reasoning: string;
  reason?: string; // 일부 API 응답에서 사용
  progressive: number;
  conservative: number;
}

export type { BiasScore };
