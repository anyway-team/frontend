'use client';

import { Badge } from '../ui/badge';
import styles from './keyword.module.css';
import commonStyles from '../common.module.css';
import { Skeleton } from '@radix-ui/themes';
import { toast } from 'sonner';
import { useRef } from 'react';

interface KeywordsProps {
  keywords?: string[];
}

export const Keywords = ({ keywords }: KeywordsProps) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleToast = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      toast('키워드 맞춤 찾기 서비스를 준비중이에요', {
        description: '조금만 기다려주세요!',
      });
    }, 300);
  };

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

  if (keywords.length === 0) {
    return <></>;
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
          onClick={handleToast}
        >
          {keyword}
        </Badge>
      ))}
    </div>
  );
};
