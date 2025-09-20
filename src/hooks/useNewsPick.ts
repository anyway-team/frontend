import { useAtom, useAtomValue } from 'jotai';
import { useCallback } from 'react';
import {
  newsPickAtom,
  isNewsPickedAtom,
  pickLoadingAtom,
  pickErrorAtom,
} from '@/stores/newsPickStore';
import {
  pickNewsActionAtom,
  unpickNewsActionAtom,
  toggleNewsPickActionAtom,
  clearPickStateActionAtom,
  syncPickStateActionAtom,
  syncSingleNewsPickActionAtom,
} from '@/stores/newsPickActions';

export function useNewsPick() {
  const pickState = useAtomValue(newsPickAtom);
  const isLoading = useAtomValue(pickLoadingAtom);
  const error = useAtomValue(pickErrorAtom);

  const [, pickNews] = useAtom(pickNewsActionAtom);
  const [, unpickNews] = useAtom(unpickNewsActionAtom);
  const [, togglePick] = useAtom(toggleNewsPickActionAtom);
  const [, clearPickState] = useAtom(clearPickStateActionAtom);
  const [, syncPickState] = useAtom(syncPickStateActionAtom);
  const [, syncSingleNewsPick] = useAtom(syncSingleNewsPickActionAtom);

  const handlePickNews = useCallback(
    async (newsId: string) => {
      try {
        await pickNews(newsId);
        return true;
      } catch (error) {
        console.error('뉴스 찜하기 실패:', error);
        return false;
      }
    },
    [pickNews]
  );

  const handleUnpickNews = useCallback(
    async (newsId: string) => {
      try {
        await unpickNews(newsId);
        return true;
      } catch (error) {
        console.error('뉴스 찜 해제 실패:', error);
        return false;
      }
    },
    [unpickNews]
  );

  const handleTogglePick = useCallback(
    async (newsId: string) => {
      try {
        await togglePick(newsId);
        return true;
      } catch (error) {
        console.error('뉴스 찜 토글 실패:', error);
        return false;
      }
    },
    [togglePick]
  );

  const isNewsPicked = useCallback(
    (newsId: string) => {
      return pickState.pickedNewsIds.has(newsId);
    },
    [pickState.pickedNewsIds]
  );

  const handleClearPickState = useCallback(() => {
    clearPickState();
  }, [clearPickState]);

  const handleSyncPickState = useCallback(
    (pickedNewsIds: string[]) => {
      syncPickState(pickedNewsIds);
    },
    [syncPickState]
  );

  const handleSyncSingleNewsPick = useCallback(
    (newsId: string, isPicked: boolean) => {
      syncSingleNewsPick({ newsId, isPicked });
    },
    [syncSingleNewsPick]
  );

  return {
    pickState,
    isLoading,
    error,

    pickNews: handlePickNews,
    unpickNews: handleUnpickNews,
    togglePick: handleTogglePick,
    isNewsPicked,
    clearPickState: handleClearPickState,
    syncPickState: handleSyncPickState,
    syncSingleNewsPick: handleSyncSingleNewsPick,
  };
}

// 특정 뉴스의 찜 상태만 확인하는 훅
export function useNewsPickStatus(newsId: string) {
  const isPickedAtom = isNewsPickedAtom(newsId);
  const isPicked = useAtomValue(isPickedAtom);
  const isLoading = useAtomValue(pickLoadingAtom);

  return { isPicked, isLoading };
}
