export const formatDotYYYYMMDD = (date: Date | string): string => {
  const d = date instanceof Date ? date : new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export const formatDateTime = (date: Date | string): string => {
  const d = date instanceof Date ? date : new Date(date);

  if (!isValidDate(d)) {
    return '';
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  const hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');

  // 12시간 형식으로 변환
  const ampm = hours >= 12 ? '오후' : '오전';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const formattedHours = String(displayHours).padStart(2, '0');

  return `${year}.${month}.${day} ${ampm} ${formattedHours}:${minutes}`;
};

export const isValidDate = (date: Date | string): boolean => {
  const d = date instanceof Date ? date : new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};

export const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  return formatDotYYYYMMDD(date);
};
