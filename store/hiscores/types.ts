export const hiscoresRequests: {
  FETCH_HISCORES_DAY: 'FETCH_HISCORES_DAY';
  FETCH_HISCORES_WEEK: 'FETCH_HISCORES_WEEK';
  FETCH_HISCORES_MONTH: 'FETCH_HISCORES_MONTH';
  FETCH_HISCORES_USER: 'FETCH_HISCORES_USER';
  FETCH_HISCORES_ALL: 'FETCH_HISCORES_ALL';
} = {
  FETCH_HISCORES_DAY: 'FETCH_HISCORES_DAY',
  FETCH_HISCORES_WEEK: 'FETCH_HISCORES_WEEK',
  FETCH_HISCORES_MONTH: 'FETCH_HISCORES_MONTH',
  FETCH_HISCORES_USER: 'FETCH_HISCORES_USER',
  FETCH_HISCORES_ALL: 'FETCH_HISCORES_ALL'
};

export interface Match {
  id: number;
}

export type HiscoreQueryTypes = 'DAY' | 'WEEK' | 'MONTH' | 'USER' | 'ALL';
