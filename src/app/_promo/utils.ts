import dayjs from 'dayjs';

export const PROMO_END_DATE = dayjs('2024-11-15').endOf('day');
export const PROMO_CODE = 'PREBLACK';
export const PROMO_PERCENTAGE_VALUE = 20;

export const getIsPromoExpired = () => {
  const end = dayjs(PROMO_END_DATE);
  const diffInMs = end.diff(dayjs());

  return diffInMs <= 0;
};

export const SPECIAL_PROMO_COOKIE = '8CfUgS-ge1RBcWWPSxssz';

export const IS_SPECIAL_PROMO_ENABLED = true;
