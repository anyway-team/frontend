'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getPickedNewsList } from '@/services/newsPickService';
import { NewsItem } from '@/repositories/newsRepository';
import { formatDateTime } from '@/utils/datetime';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useNewsPick } from '@/hooks/useNewsPick';

export default function SavedNewsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { pickState } = useNewsPick(); // 찜 상태 변경 감지용
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace('/my');
    }
  }, [authLoading, isAuthenticated, router]);

  // 찜한 뉴스 목록 가져오기
  const fetchPickedNews = async (pageNum: number = 0, reset: boolean = false) => {
    try {
      setIsLoading(true);
      const response = await getPickedNewsList({ page: pageNum, size: 10 });
      
      if (reset) {
        setNewsList(response.news);
      } else {
        setNewsList(prev => [...prev, ...response.news]);
      }
      
      setHasMore(response.news.length === 10);
      setError(null);
    } catch (err) {
      console.error('찜한 뉴스 목록 가져오기 실패:', err);
      setError('찜한 뉴스를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPickedNews(0, true);
    }
  }, [isAuthenticated]);

  // 찜 상태가 변경될 때마다 목록 새로고침
  useEffect(() => {
    if (isAuthenticated) {
      // 찜 상태 변경 시 첫 페이지부터 다시 로드
      setPage(0);
      fetchPickedNews(0, true);
    }
  }, [pickState.pickedNewsIds.size, isAuthenticated]); // 찜한 뉴스 개수가 변경될 때 실행

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPickedNews(nextPage, false);
  };

  const handleNewsClick = (newsId: string) => {
    router.push(`/news/${newsId}`);
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      paddingBottom: '20px'
    }}>
      {/* 헤더 */}
      <div style={{
        backgroundColor: 'white',
        padding: '16px 20px',
        borderBottom: '1px solid #e9ecef',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            style={{ padding: '8px' }}
          >
            <Image
              src="/back.png"
              alt="뒤로 가기"
              width={24}
              height={24}
            />
          </Button>
          <h1 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            margin: 0
          }}>
            찜한 뉴스
          </h1>
          <div style={{ width: '40px' }} /> {/* 균형을 위한 빈 공간 */}
        </div>
      </div>

      {/* 컨텐츠 */}
      <div style={{ padding: '20px' }}>
        {error && (
          <div style={{
            backgroundColor: '#fff5f5',
            color: '#c53030',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {newsList.length === 0 && !isLoading && !error && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '60px 20px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px'
            }}>
              📰
            </div>
            <div style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '8px'
            }}>
              아직 찜한 뉴스가 없어요
            </div>
            <div style={{
              fontSize: '14px',
              color: '#999'
            }}>
              관심있는 뉴스를 찜해보세요!
            </div>
          </div>
        )}

        {/* 뉴스 목록 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {newsList.map((news) => (
            <div
              key={news.id}
              onClick={() => handleNewsClick(news.id)}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                gap: '12px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.98)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {news.thumbnail_url && (
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundColor: '#f0f0f0'
                }}>
                  <Image
                    src={news.thumbnail_url}
                    alt={news.title}
                    width={80}
                    height={80}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '4px'
                }}>
                  {news.publisher}
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#333',
                  lineHeight: '1.4',
                  marginBottom: '8px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {news.title}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#999',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  📅 {formatDateTime(news.published_at)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 */}
        {hasMore && newsList.length > 0 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px'
          }}>
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              style={{
                padding: '12px 24px',
                backgroundColor: isLoading ? '#e9ecef' : '#333',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? '로딩 중...' : '더보기'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
