export const hiscoresRequests: {
  FETCH_HISCORES_DAY: 'FETCH_HISCORES_DAY';
  FETCH_HISCORES_WEEK: 'FETCH_HISCORES_WEEK';
  FETCH_HISCORES_MONTH: 'FETCH_HISCORES_MONTH';
  FETCH_HISCORES_USER: 'FETCH_HISCORES_USER';
  FETCH_HISCORES_ALL: 'FETCH_HISCORES_ALL';
  FETCH_USER_HISCORES_TOP_MATCHES: 'FETCH_USER_HISCORES_TOP_MATCHES';
} = {
  FETCH_HISCORES_DAY: 'FETCH_HISCORES_DAY',
  FETCH_HISCORES_WEEK: 'FETCH_HISCORES_WEEK',
  FETCH_HISCORES_MONTH: 'FETCH_HISCORES_MONTH',
  FETCH_HISCORES_USER: 'FETCH_HISCORES_USER',
  FETCH_HISCORES_ALL: 'FETCH_HISCORES_ALL',
  FETCH_USER_HISCORES_TOP_MATCHES: 'FETCH_USER_HISCORES_TOP_MATCHES'
};

export interface Match {
  accuracy: number;
  created_at: string;
  errors: number;
  formattedTime: string;
  id: number;
  nickname: string;
  placed: number;
  time: number;
  user: { id: number; isAdmin: boolean; username: string };
  wpm: number;
}

export type HiscoreQueryTypes = 'DAY' | 'WEEK' | 'MONTH' | 'USER' | 'ALL';
