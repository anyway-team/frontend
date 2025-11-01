'use client';
import Image from 'next/image';
import { useState } from 'react';
import { getTimeAgo } from '@/utils/datetime';
import { useAnalytics } from '@/hooks/useAnalytics';

interface NewsCardProps {
  id: string;
  title: string;
  publisher: string;
  publishedAt: string | Date;
  thumbnailUrl: string;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

const NewsCard = ({
  id,
  title,
  publisher,
  publishedAt,
  thumbnailUrl,
  onClick,
  size = 'medium',
}: NewsCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { trackNewsCardClick } = useAnalytics();

  const handleClick = () => {
    // GA 이벤트 추적
    trackNewsCardClick({
      newsId: id,
      title,
      publisher,
    });

    // 기존 onClick 핸들러 실행
    onClick?.();
  };

  // 사이즈별 설정
  const sizeConfig = {
    small: { imageSize: 80, titleSize: '14px', metaSize: '12px' },
    medium: { imageSize: 120, titleSize: '16px', metaSize: '13px' },
    large: { imageSize: 140, titleSize: '18px', metaSize: '13px' },
  };

  const config = sizeConfig[size];
  const date = publishedAt instanceof Date ? publishedAt : new Date(publishedAt);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: '12px',
        background: isHovered ? '#f9fafb' : '#fff',
        minHeight: `${config.imageSize}px`,
        gap: '12px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        padding: '8px',
        borderRadius: '8px',
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 썸네일 이미지 - round */}
      {thumbnailUrl && !imageError ? (
        <div
          style={{
            width: `${config.imageSize}px`,
            height: `${config.imageSize}px`,
            borderRadius: '12px',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <Image
            src={thumbnailUrl}
            alt={title}
            width={config.imageSize}
            height={config.imageSize}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
            onError={() => setImageError(true)}
            unoptimized
          />
        </div>
      ) : (
        <div
          style={{
            width: `${config.imageSize}px`,
            height: `${config.imageSize}px`,
            backgroundColor: '#f3f4f6',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
            fontSize: '12px',
            flexShrink: 0,
          }}
        >
          이미지 없음
        </div>
      )}

      {/* 뉴스 정보 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minWidth: 0, // 텍스트 오버플로우 처리를 위해 필요
        }}
      >
        {/* 제목 */}
        <div
          style={{
            fontWeight: 700,
            fontSize: config.titleSize,
            lineHeight: '1.4',
            letterSpacing: '-0.17px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            wordBreak: 'break-word',
          }}
        >
          {title}
        </div>

        {/* 발행사 & 발행 시간 */}
        <div>
          <div
            style={{
              fontWeight: 500,
              fontSize: config.metaSize,
              lineHeight: '1.5',
              letterSpacing: '-0.17px',
              color: '#374151',
              marginBottom: '4px',
            }}
          >
            {publisher}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: config.metaSize,
                lineHeight: '100%',
                letterSpacing: '-0.17px',
                color: '#4B9CFF',
              }}
            >
              발행
            </span>
            <span
              style={{
                color: '#666666',
                fontSize: config.metaSize,
                lineHeight: '1.5',
                letterSpacing: '-0.17px',
              }}
            >
              ·
            </span>
            <span
              style={{
                fontWeight: 500,
                fontSize: config.metaSize,
                lineHeight: '1.5',
                letterSpacing: '-0.17px',
                color: '#666666',
              }}
            >
              {getTimeAgo(date)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { NewsCard };
