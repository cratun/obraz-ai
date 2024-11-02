import dayjs from 'dayjs';
import AppContainer from '@/app/_components/app-container';
import { getIsPromoExpired, PROMO_CODE, PROMO_END_DATE, PROMO_PERCENTAGE_VALUE } from './utils';

const getPromoEndDay = () => {
  const formattedDate = dayjs(PROMO_END_DATE).locale('pl');
  const today = dayjs().startOf('day');
  const tomorrow = dayjs().add(1, 'day').startOf('day');

  if (formattedDate.isSame(today, 'day')) {
    return 'Dzisiaj';
  } else if (formattedDate.isSame(tomorrow, 'day')) {
    return 'Jutro';
  } else {
    return formattedDate.format('dddd');
  }
};

const PromoBar = () => {
  if (getIsPromoExpired()) {
    return null;
  }

  return (
    <div className="flex min-h-[17px] items-center justify-center bg-accent px-5">
      <AppContainer.Content className="block text-xs text-white">
        <div>
          <strong>-{PROMO_PERCENTAGE_VALUE}%</strong> z kodem <strong className="font-sans">{PROMO_CODE}</strong> |
          Koniec:&nbsp;
          <strong className="capitalize">{getPromoEndDay()}</strong> | Darmowa dostawa
        </div>
      </AppContainer.Content>
    </div>
  );
};

export default PromoBar;
