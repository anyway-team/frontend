'use client';
import Image from 'next/image';
import { useState } from 'react';

interface ThumbnailProps {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export const Thumbnail = ({ 
  url, 
  alt = 'thumbnail', 
  width, 
  height = 300 
}: ThumbnailProps) => {
  const [error, setError] = useState(false);

  // URL이 없거나 에러가 발생한 경우 fallback UI 표시
  if (!url || error) {
    return (
      <div 
        style={{ 
          width: width || '100%', 
          height, 
          position: 'relative',
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b7280',
          fontSize: '0.9rem',
          border: '1px solid #e5e7eb'
        }}
      >
        {!url ? '이미지 없음' : '이미지 로드 실패'}
      </div>
    );
  }

  return (
    <div style={{ width: width || '100%', height, position: 'relative' }}>
      <Image 
        src={url} 
        alt={alt} 
        fill 
        style={{ objectFit: 'cover' }}
        onError={() => setError(true)}
        unoptimized
      />
    </div>
  );
};
