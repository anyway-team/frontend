'use client';

import { Badge } from '../ui/badge';
import styles from './keyword.module.css';
import commonStyles from '../common.module.css';
import { Skeleton } from '@radix-ui/themes';

interface KeywordsProps {
  keywords?: string[];
}

export const Keywords = ({ keywords }: KeywordsProps) => {
  // 데이터가 없을 때는 스켈레톤 표시
  if (!keywords) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
        className={styles.keywordWrapper}
      >
        {new Array(3).fill(0).map((_, index) => (
          <Skeleton
            key={index}
            style={{
              width: 100,
              height: 32,
            }}
          />
        ))}
      </div>
    );
  }

  // 키워드 배열이 비어있을 때는 기본 메시지 표시
  if (keywords.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          padding: '16px',
          color: '#6b7280',
          fontSize: '0.9rem',
        }}
        className={styles.keywordWrapper}
      >
        인기 키워드를 불러올 수 없습니다
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        overflowX: 'auto',
        whiteSpace: 'nowrap',
      }}
      className={styles.keywordWrapper}
    >
      {keywords.map((keyword: string, index: number) => (
        <Badge
          variant="secondary"
          key={index}
          className={commonStyles.pressable}
          style={{
            width: 100,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {keyword}
        </Badge>
      ))}
    </div>
  );
};
