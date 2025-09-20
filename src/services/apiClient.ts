import { API_ENDPOINTS } from '@/constants/api';

interface ApiRequestOptions extends RequestInit {
  skipAuth?: boolean;
  skipRetry?: boolean;
}

class ApiClient {
  private isRefreshing = false;
  private refreshPromise: Promise<boolean> | null = null;

  // 토큰 갱신
  private async refreshToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      this.clearTokens();
      return false;
    }

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.REFRESH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('토큰 갱신 실패');
      }

      const data = await response.json();
      
      // 새로운 토큰들을 저장
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      return true;
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
      this.clearTokens();
      return false;
    }
  }

  // 토큰 제거
  private clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  // Authorization 헤더 생성
  private getAuthHeaders(): Record<string, string> {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      return {
        'Authorization': `Bearer ${accessToken}`,
      };
    }
    
    return {};
  }

  // API 요청 (토큰 자동 갱신 포함)
  async request<T = any>(url: string, options: ApiRequestOptions = {}): Promise<T> {
    const { skipAuth = false, skipRetry = false, ...fetchOptions } = options;

    // 기본 헤더 설정
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers as Record<string, string> || {}),
    };

    // 인증이 필요한 경우 Authorization 헤더 추가
    if (!skipAuth) {
      Object.assign(headers, this.getAuthHeaders());
    }

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      });

      // 401 에러 (토큰 만료) 처리
      if (response.status === 401 && !skipAuth && !skipRetry) {
        // 이미 토큰 갱신 중이면 기다림
        if (this.isRefreshing) {
          const refreshSuccess = await this.refreshPromise;
          if (refreshSuccess) {
            // 토큰 갱신 성공 시 재시도
            return this.request(url, { ...options, skipRetry: true });
          } else {
            throw new Error('인증이 필요합니다.');
          }
        }

        // 토큰 갱신 시도
        this.isRefreshing = true;
        this.refreshPromise = this.refreshToken();
        
        const refreshSuccess = await this.refreshPromise;
        this.isRefreshing = false;
        this.refreshPromise = null;

        if (refreshSuccess) {
          // 토큰 갱신 성공 시 재시도
          return this.request(url, { ...options, skipRetry: true });
        } else {
          throw new Error('인증이 필요합니다.');
        }
      }

      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
      }

      // 응답이 JSON이 아닐 수 있으므로 확인
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return response as any;
      }
    } catch (error) {
      console.error('API 요청 실패:', error);
      throw error;
    }
  }

  // GET 요청
  async get<T = any>(url: string, options: ApiRequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  // POST 요청
  async post<T = any>(url: string, data?: any, options: ApiRequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT 요청
  async put<T = any>(url: string, data?: any, options: ApiRequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE 요청
  async delete<T = any>(url: string, options: ApiRequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  // Form 데이터 POST 요청
  async postForm<T = any>(url: string, formData: FormData | URLSearchParams, options: ApiRequestOptions = {}): Promise<T> {
    const { headers = {}, ...restOptions } = options;
    
    // Form 데이터의 경우 Content-Type 헤더를 별도로 설정
    const formHeaders: Record<string, string> = {
      ...this.getAuthHeaders(),
      ...(headers as Record<string, string>),
    };

    // URLSearchParams의 경우 Content-Type 설정
    if (formData instanceof URLSearchParams) {
      formHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    // FormData의 경우 브라우저가 자동으로 Content-Type을 설정하므로 제외
    
    return this.request<T>(url, {
      ...restOptions,
      method: 'POST',
      headers: formHeaders,
      body: formData,
    });
  }
}

// 싱글톤 인스턴스 생성
export const apiClient = new ApiClient();
