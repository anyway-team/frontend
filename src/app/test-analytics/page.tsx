'use client';

import { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

export default function TestAnalyticsPage() {
  const analytics = useAnalytics();
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev]);
  };

  const tests = [
    {
      name: '1. 페이지뷰 테스트',
      description: '페이지를 이동하면 자동으로 추적됩니다',
      action: () => {
        addLog('✅ 페이지뷰는 자동 추적됩니다. /home으로 이동해보세요!');
      },
    },
    {
      name: '2. 뉴스 카드 클릭',
      description: '뉴스 카드를 클릭했을 때',
      action: () => {
        analytics.trackNewsCardClick({
          newsId: 'test-123',
          title: '테스트 뉴스 제목',
          publisher: '테스트 언론사',
          category: 'politics',
        });
        addLog('✅ 뉴스 카드 클릭 이벤트 전송됨');
      },
    },
    {
      name: '3. 뉴스 상세 조회',
      description: '뉴스 상세 페이지를 봤을 때',
      action: () => {
        analytics.trackNewsDetailView({
          newsId: 'test-456',
          title: '테스트 상세 뉴스',
          publisher: '테스트 언론사',
        });
        addLog('✅ 뉴스 상세 조회 이벤트 전송됨');
      },
    },
    {
      name: '4. 뉴스 비교 조회',
      description: '뉴스 비교 페이지를 봤을 때',
      action: () => {
        analytics.trackNewsComparisonView({
          comparisonId: 'comp-789',
          leftPublisher: '좌파 언론',
          rightPublisher: '우파 언론',
        });
        addLog('✅ 뉴스 비교 조회 이벤트 전송됨');
      },
    },
    {
      name: '5. 검색',
      description: '뉴스를 검색했을 때',
      action: () => {
        analytics.trackSearch({
          keyword: '정치',
          resultsCount: 42,
        });
        addLog('✅ 검색 이벤트 전송됨');
      },
    },
    {
      name: '6. 뉴스 찜하기',
      description: '뉴스를 찜했을 때',
      action: () => {
        analytics.trackNewsPick({
          newsId: 'pick-123',
          title: '찜한 뉴스',
        });
        addLog('✅ 뉴스 찜하기 이벤트 전송됨');
      },
    },
    {
      name: '7. 뉴스 찜 해제',
      description: '뉴스 찜을 해제했을 때',
      action: () => {
        analytics.trackNewsUnpick('pick-123');
        addLog('✅ 뉴스 찜 해제 이벤트 전송됨');
      },
    },
    {
      name: '8. 커스텀 이벤트',
      description: '직접 이벤트를 만들어서 전송',
      action: () => {
        trackEvent('news_search', {
          search_keyword: '커스텀 검색',
          results_count: 100,
        });
        addLog('✅ 커스텀 이벤트 전송됨');
      },
    },
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px' }}>
        📊 Google Analytics 테스트 페이지
      </h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        개발자 도구 콘솔(F12)을 열고 아래 버튼들을 클릭해보세요!
      </p>

      {/* 환경 정보 */}
      <div
        style={{
          background: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
        }}
      >
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>
          🔍 현재 환경
        </h2>
        <p>
          <strong>NODE_ENV:</strong> {process.env.NODE_ENV}
        </p>
        <p>
          <strong>GA ID:</strong> {process.env.NEXT_PUBLIC_GA_ID || '설정되지 않음'}
        </p>
        <p style={{ marginTop: '8px', color: '#0369a1' }}>
          💡 개발 환경에서는 콘솔에 <code>[GA Debug]</code> 로그가 출력됩니다.
        </p>
      </div>

      {/* 테스트 버튼들 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {tests.map((test, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '16px',
              background: '#fff',
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '8px' }}>
              {test.name}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '12px' }}>
              {test.description}
            </p>
            <Button
              onClick={test.action}
              style={{
                width: '100%',
                background: '#3b82f6',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}
            >
              테스트 실행
            </Button>
          </div>
        ))}
      </div>

      {/* 로그 출력 */}
      <div
        style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>📝 이벤트 로그</h3>
          <button
            onClick={() => setLogs([])}
            style={{
              background: '#475569',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.75rem',
            }}
          >
            로그 지우기
          </button>
        </div>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {logs.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>
              위의 버튼을 클릭하면 이벤트가 전송되고 여기에 로그가 표시됩니다.
            </p>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '4px' }}>
                {log}
              </div>
            ))
          )}
        </div>
      </div>

      {/* 도움말 */}
      <div
        style={{
          marginTop: '24px',
          padding: '16px',
          background: '#fef3c7',
          border: '1px solid #fbbf24',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '8px' }}>
          💡 콘솔에서 확인하는 방법
        </h3>
        <ol style={{ marginLeft: '20px', lineHeight: '1.6' }}>
          <li>
            <strong>F12</strong> 또는 <strong>Cmd+Option+I</strong> (Mac)를 눌러 개발자 도구 열기
          </li>
          <li>
            <strong>Console</strong> 탭 선택
          </li>
          <li>위의 버튼들을 클릭</li>
          <li>
            콘솔에 <code style={{ background: '#fff', padding: '2px 4px' }}>[GA Debug]</code> 로그가
            보이면 성공!
          </li>
        </ol>
      </div>

      {/* 스크롤 테스트용 공간 */}
      <div
        style={{ marginTop: '48px', padding: '24px', background: '#f3f4f6', borderRadius: '8px' }}
      >
        <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '16px' }}>
          📏 스크롤 깊이 테스트
        </h3>
        <p style={{ marginBottom: '16px' }}>
          이 페이지를 아래로 스크롤하면 25%, 50%, 75%, 100% 지점에서 자동으로 이벤트가 전송됩니다.
        </p>
        <div
          style={{ height: '2000px', background: 'linear-gradient(to bottom, #e0f2fe, #bae6fd)' }}
        >
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>⬇️ 아래로 스크롤해보세요! ⬇️</p>
          </div>
        </div>
      </div>
    </div>
  );
}
