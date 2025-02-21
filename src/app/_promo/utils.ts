import dayjs from 'dayjs';

export const PROMO_END_DATE = dayjs('2025-02-28').endOf('day');
export const PROMO_CODE = 'LUTY28';
export const PROMO_PERCENTAGE_VALUE = 30;

export const getIsPromoExpired = () => {
  const end = dayjs(PROMO_END_DATE);
  const diffInMs = end.diff(dayjs());

  return diffInMs <= 0;
};

export const SPECIAL_PROMO_COOKIE = '8CfUgS-ge1RBcWWPSxsszaa';

export const IS_SPECIAL_PROMO_ENABLED = true;
