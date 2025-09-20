import { atom } from 'jotai';
import { newsPickAtom } from './newsPickStore';
import { pickNews, unpickNews } from '@/services/newsPickService';

// 뉴스 찜하기 액션
export const pickNewsActionAtom = atom(null, async (get, set, newsId: string) => {
  const currentState = get(newsPickAtom);

  // 로딩 상태 시작
  set(newsPickAtom, { ...currentState, isLoading: true, error: null });

  try {
    await pickNews(newsId);

    // 찜 목록에 추가
    const newPickedIds = new Set<string>(currentState.pickedNewsIds);
    newPickedIds.add(newsId);

    set(newsPickAtom, {
      pickedNewsIds: newPickedIds,
      isLoading: false,
      error: null,
    });

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '뉴스 찜하기에 실패했습니다.';

    set(newsPickAtom, {
      ...currentState,
      isLoading: false,
      error: errorMessage,
    });

    throw error;
  }
});

// 뉴스 찜 해제 액션
export const unpickNewsActionAtom = atom(null, async (get, set, newsId: string) => {
  const currentState = get(newsPickAtom);

  // 로딩 상태 시작
  set(newsPickAtom, { ...currentState, isLoading: true, error: null });

  try {
    await unpickNews(newsId);

    // 찜 목록에서 제거
    const newPickedIds = new Set<string>(currentState.pickedNewsIds);
    newPickedIds.delete(newsId);

    set(newsPickAtom, {
      pickedNewsIds: newPickedIds,
      isLoading: false,
      error: null,
    });

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '뉴스 찜 해제에 실패했습니다.';

    set(newsPickAtom, {
      ...currentState,
      isLoading: false,
      error: errorMessage,
    });

    throw error;
  }
});

// 뉴스 찜 토글 액션
export const toggleNewsPickActionAtom = atom(null, async (get, set, newsId: string) => {
  const currentState = get(newsPickAtom);
  const isPicked = currentState.pickedNewsIds.has(newsId);

  if (isPicked) {
    return await set(unpickNewsActionAtom, newsId);
  } else {
    return await set(pickNewsActionAtom, newsId);
  }
});

// 찜 상태 초기화 액션 (로그아웃 시 사용)
export const clearPickStateActionAtom = atom(null, (get, set) => {
  set(newsPickAtom, {
    pickedNewsIds: new Set<string>(),
    isLoading: false,
    error: null,
  });
});

// 찜한 뉴스 목록으로부터 상태 동기화 액션
export const syncPickStateActionAtom = atom(null, (get, set, pickedNewsIds: string[]) => {
  const currentState = get(newsPickAtom);

  set(newsPickAtom, {
    ...currentState,
    pickedNewsIds: new Set<string>(pickedNewsIds),
  });
});

// 단일 뉴스의 찜 상태 동기화 액션
export const syncSingleNewsPickActionAtom = atom(
  null,
  (get, set, { newsId, isPicked }: { newsId: string; isPicked: boolean }) => {
    const currentState = get(newsPickAtom);
    const newPickedIds = new Set<string>(currentState.pickedNewsIds);

    if (isPicked) {
      newPickedIds.add(newsId);
    } else {
      newPickedIds.delete(newsId);
    }

    set(newsPickAtom, {
      ...currentState,
      pickedNewsIds: newPickedIds,
    });
  }
);
