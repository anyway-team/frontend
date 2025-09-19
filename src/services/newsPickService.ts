import { API_ENDPOINTS } from '@/constants/api';
import { apiClient } from '@/services/apiClient';
import { NewsResponse, NewsParams } from '@/repositories/newsRepository';

export interface PickNewsRequest {
  news_id: string;
}

export interface PickNewsResponse {
  success: boolean;
  message?: string;
}

// 뉴스 찜하기
export const pickNews = async (newsId: string): Promise<PickNewsResponse> => {
  try {
    return await apiClient.post<PickNewsResponse>(API_ENDPOINTS.NEWS.PICK, {
      news_id: newsId,
    });
  } catch (error) {
    console.error('뉴스 찜하기 실패:', error);
    throw error;
  }
};

// 뉴스 찜 해제
export const unpickNews = async (newsId: string): Promise<PickNewsResponse> => {
  try {
    await apiClient.delete(API_ENDPOINTS.NEWS.UNPICK(newsId));
    return { success: true };
  } catch (error) {
    console.error('뉴스 찜 해제 실패:', error);
    throw error;
  }
};

// 찜한 뉴스 목록 가져오기
export const getPickedNewsList = async ({ page = 0, size = 10, keyword }: NewsParams): Promise<NewsResponse> => {
  try {
    const formData = new URLSearchParams();
    formData.append('page', page.toString());
    formData.append('size', size.toString());
    if (keyword) {
      formData.append('keyword', keyword);
    }

    return await apiClient.postForm<NewsResponse>(API_ENDPOINTS.NEWS.PICK_LIST, formData);
  } catch (error) {
    console.error('찜한 뉴스 목록 가져오기 실패:', error);
    throw error;
  }
};

// 뉴스 찜 상태 확인 (뉴스 상세 정보에 포함되어 있다고 가정)
export const checkNewsPickStatus = async (newsId: string): Promise<boolean> => {
  try {
    // 실제로는 뉴스 상세 정보에 isPicked 필드가 포함되어 있을 것으로 예상
    // 현재는 임시로 false 반환
    return false;
  } catch (error) {
    console.error('뉴스 찜 상태 확인 실패:', error);
    return false;
  }
};
