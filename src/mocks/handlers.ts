import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/home', () => {
    return HttpResponse.json({
      hot_keywords: ['이재명', '25만원', '트럼프', '대통령', '대통령 선거'],
      today_comparisons: {
        id: '1',
        left_news_preview: {
          title: '"골목상권 살리자"‥\'25만 원 지역화폐\' 기대감',
          publisher: 'MBC',
          thumbnail_url:
            'https://imgnews.pstatic.net/image/056/2025/06/08/0021738415_001_20250608071114923.jpg?type=w800',
        },
        right_news_preview: {
          title:
            "\"지원은 있지만, 구조는 없다\".. 25만 원 지역화폐, 문제는 '소비'가 아니라 '시스템'",
          publisher: 'SBS',
          thumbnail_url:
            'https://imgnews.pstatic.net/image/055/2025/06/06/0000082315_001_20250606082104067.jpg?type=w800',
        },
      },
      today_news: [
        {
          id: 'b796f6f5-8bf4-46fd-9995-e748a3413818',
          title: '선거비 한 푼도 못 받는 이준석, 오히려 흑자?…"후원금 3억 원 초과"',
          published_at: '2025-06-07T22:15:13.987912Z',
          thumbnail_url:
            'https://imgnews.pstatic.net/image/011/2025/06/07/0004494281_001_20250607221411171.png?type=w800',
          publisher: '서울경제',
        },
        {
          id: '4fe9fab1-871e-4ee0-aff8-3760256e75e1',
          title: '"환승하는 길에"...김문수, \'윤석열 어게인\' 집회 등장? 알고보니',
          published_at: '2025-06-07T22:04:14.067675Z',
          thumbnail_url:
            'https://imgnews.pstatic.net/image/018/2025/06/07/0006033696_001_20250607220312850.jpg?type=w800',
          publisher: '이데일리',
        },
        {
          id: '8f9a2973-e077-4aa5-9890-1155040fc61d',
          title: '"진정한 성공은…" 이재명 대통령, 전현직 당 지도부와 한남동 관저 만찬',
          published_at: '2025-06-07T21:51:14.178594Z',
          thumbnail_url:
            'https://imgnews.pstatic.net/image/008/2025/06/07/0005204359_001_20250607215215117.jpg?type=w800',
          publisher: '머니투데이',
        },
        {
          id: '4ebdb54a-ad1d-494d-9f02-0c58bd63598d',
          title: '‘일병만 15개월’ 나오나…"월급 아끼려" 반발',
          published_at: '2025-06-07T21:42:14.434980Z',
          thumbnail_url:
            'https://imgnews.pstatic.net/image/056/2025/06/07/0011966141_001_20250607215921846.png?type=w800',
          publisher: 'KBS',
        },
        {
          id: '6b4739e7-c3a2-49b9-b65f-608b6514c350',
          title: '이 대통령, 여당 지도부와 만찬…"국민 삶 개선이 진짜 성공"',
          published_at: '2025-06-07T21:42:14.348788Z',
          thumbnail_url:
            'https://imgnews.pstatic.net/image/028/2025/06/07/0002749843_001_20250607221615302.jpg?type=w800',
          publisher: '한겨레',
        },
        {
          id: 'b2ba548c-4925-4d54-9fb7-43fdd73e5688',
          title: '李대통령, 여당 지도부 만찬… "국민의 삶 나아지는 것이 진짜 성공"',
          published_at: '2025-06-07T21:42:14.269947Z',
          thumbnail_url:
            'https://imgnews.pstatic.net/image/020/2025/06/07/0003639782_001_20250607213511860.jpg?type=w800',
          publisher: '동아일보',
        },
        {
          id: 'd1c77ed7-8748-47bb-b9c1-cb9fbcd3cc77',
          title: '"박원순 성희롱 인정" 인권위 판단…대법 4년 만에 확정',
          published_at: '2025-06-07T20:42:14.516423Z',
          thumbnail_url:
            'https://imgnews.pstatic.net/image/011/2025/06/07/0004494276_001_20250607204210292.jpg?type=w800',
          publisher: '서울경제',
        },
      ],
    });
  }),

  http.post('https://34.64.170.41/api/news', () => {
    return HttpResponse.json({
      news: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          title: '尹 뽑은 유권자 10명 중 4명 "국민의힘, 계엄 반성하고 탄핵 받아들였어야"',
          published_at: '2025-06-09T09:00:00Z',
          thumbnail_url:
            'https://imgnews.pstatic.net/image/002/2025/06/09/0002392251_001_20250609203310827.jpg?type=w860',
          publisher: '프레시안',
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          title: "'이준석 의원직 제명하라' 청원에 동의 폭주‥닷새 만에 40만명 돌파",
          published_at: '2025-06-09T20:22:00Z',
          thumbnail_url:
            'https://mimgnews.pstatic.net/image/origin/214/2025/06/09/1429134.jpg?type=ofullfill220_150',
          publisher: 'MBC',
        },
      ],
    });
  }),

  http.get('https://34.64.170.41/api/news/:id', () => {
    return HttpResponse.json({
      id: '550e8400-e29b-41d4-a716-446655440000',
      title: 'AI가 바꿀 미래 일자리',
      published_at: '2024-06-04T09:00:00Z',
      source: '경향신문',
      thumbnail_url:
        'https://imgnews.pstatic.net/image/002/2025/06/09/0002392251_001_20250609203310827.jpg?type=w860',
      summary: [
        'AI 기술이 다양한 산업에 도입되고 있다.',
        '일자리 변화가 예상된다.',
        '정부와 기업의 대응이 필요하다.',
      ],
      bias_score: {
        progressive: 60,
        conservative: 40,
        reason: '기술 발전에 긍정적 시각',
      },
      good_comment: '미래를 준비하는 좋은 기사입니다.',
      bad_comment: '구체적인 데이터가 부족합니다.',
    });
  }),

  http.get('https://34.64.170.41/api/news/comparisons/:id', () => {
    return HttpResponse.json({
      id: '550e8400-e29b-41d4-a716-446655440088',
      left_news: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        title: '진보 언론: 경제 위기, 정부 대책은?',
        published_at: '2024-06-04T07:00:00Z',
        source: '한겨레',
        thumbnail_url:
          'https://imgnews.pstatic.net/image/056/2025/06/08/0021738415_001_20250608071114923.jpg?type=w800',
        summary: ['정부의 적극적 대책 필요', '복지 확대 강조'],
        bias_score: {
          progressive: 80,
          conservative: 20,
          reason: '복지 확대 강조',
        },
        good_comment: '사회적 약자에 대한 배려가 돋보임',
        bad_comment: '재원 마련 방안이 부족함',
      },
      right_news: {
        id: '550e8400-e29b-41d4-a716-446655440001',
        title: '보수 언론: 경제 위기, 야당 책임론',
        published_at: '2024-06-04T07:00:00Z',
        source: '조선일보',
        thumbnail_url:
          'https://imgnews.pstatic.net/image/055/2025/06/06/0000082315_001_20250606082104067.jpg?type=w800',
        summary: ['야당의 정책 실패 지적', '시장 자율 강조'],
        bias_score: {
          progressive: 20,
          conservative: 80,
          reason: '시장 자율 강조',
        },
        good_comment: '현실적인 대안 제시',
        bad_comment: '정치적 편향이 강함',
      },
    });
  }),
];
