'use client';

import { Badge } from '../ui/badge';
import styles from './keyword.module.css';
import commonStyles from '../common.module.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Skeleton } from '@radix-ui/themes';

export const Keywords = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/home'],
    queryFn: async () => {
      const res = await axios.get('/api/home');
      return res.data;
    },
  });

  if (isLoading)
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
  if (error) return <div>에러 발생</div>;

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
      {data?.hot_keywords?.map((keyword: string, index: number) => (
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
