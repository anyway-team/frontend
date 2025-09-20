import { atom } from 'jotai';

export interface NewsPickState {
  pickedNewsIds: Set<string>;
  isLoading: boolean;
  error: string | null;
}

// 초기 찜 상태
const initialPickState: NewsPickState = {
  pickedNewsIds: new Set(),
  isLoading: false,
  error: null,
};

// 찜 상태 atom
export const newsPickAtom = atom<NewsPickState>(initialPickState);

// 특정 뉴스의 찜 상태 확인 atom
export const isNewsPickedAtom = (newsId: string) =>
  atom((get) => {
    const pickState = get(newsPickAtom);
    return pickState.pickedNewsIds.has(newsId);
  });

// 찜 로딩 상태 atom
export const pickLoadingAtom = atom((get) => get(newsPickAtom).isLoading);

// 찜 에러 상태 atom
export const pickErrorAtom = atom((get) => get(newsPickAtom).error);
