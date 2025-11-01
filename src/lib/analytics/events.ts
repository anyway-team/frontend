/**
 * Google Analytics 이벤트 타입 정의
 *
 * 타입 안전성을 위해 모든 이벤트를 미리 정의합니다.
 */

/**
 * 뉴스 관련 이벤트
 */
export type NewsEvent =
  | {
      name: 'news_card_click';
      params: {
        news_id: string;
        news_title: string;
        publisher: string;
        category?: string;
      };
    }
  | {
      name: 'news_detail_view';
      params: {
        news_id: string;
        news_title: string;
        publisher: string;
      };
    }
  | {
      name: 'news_comparison_view';
      params: {
        comparison_id: string;
        left_publisher: string;
        right_publisher: string;
      };
    }
  | {
      name: 'news_search';
      params: {
        search_keyword: string;
        results_count: number;
      };
    };

/**
 * 인증 관련 이벤트
 */
export type AuthEvent =
  | {
      name: 'login_attempt';
      params: {
        method: 'kakao';
      };
    }
  | {
      name: 'login_success';
      params: {
        method: 'kakao';
        user_type: 'user' | 'premium';
      };
    }
  | {
      name: 'login_failure';
      params: {
        method: 'kakao';
        error_message: string;
      };
    }
  | {
      name: 'logout';
      params: {
        user_type: 'user' | 'premium';
      };
    };

/**
 * 사용자 행동 이벤트
 */
export type UserActionEvent =
  | {
      name: 'news_pick';
      params: {
        news_id: string;
        news_title: string;
      };
    }
  | {
      name: 'news_unpick';
      params: {
        news_id: string;
      };
    }
  | {
      name: 'scroll_depth';
      params: {
        page_path: string;
        depth_percentage: number;
      };
    }
  | {
      name: 'page_engagement';
      params: {
        page_path: string;
        engagement_time_seconds: number;
      };
    };

/**
 * 프리미엄 관련 이벤트
 */
export type PremiumEvent =
  | {
      name: 'premium_feature_attempt';
      params: {
        feature_name: string;
        user_type: 'guest' | 'user';
      };
    }
  | {
      name: 'premium_upgrade_click';
      params: {
        from_page: string;
      };
    };

/**
 * 네비게이션 이벤트
 */
export type NavigationEvent = {
  name: 'navigation_click';
  params: {
    destination: string;
    from_page: string;
  };
};

/**
 * 모든 이벤트 타입의 유니온
 */
export type AnalyticsEvent =
  | NewsEvent
  | AuthEvent
  | UserActionEvent
  | PremiumEvent
  | NavigationEvent;

/**
 * 이벤트 이름만 추출
 */
export type EventName = AnalyticsEvent['name'];

/**
 * 특정 이벤트의 파라미터 타입 추출
 */
export type EventParams<T extends EventName> = Extract<AnalyticsEvent, { name: T }>['params'];
