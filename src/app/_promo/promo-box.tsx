import { useState } from 'react';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import { ButtonBase } from '@mui/material';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { useCopyToClipboard } from 'usehooks-ts';
import { sizeToPrice } from '@/app/(main-layout)/generate/_utils/common';
import { CanvasSize } from '@/app/_utils/sizes-utils';
import { SpecialPromoCookie } from './special-promo-cookie';
import useCountdownTimer from './use-countdown-timer';
import {
  getIsPromoExpired,
  IS_SPECIAL_PROMO_ENABLED,
  PROMO_CODE,
  PROMO_END_DATE,
  PROMO_PERCENTAGE_VALUE,
} from './utils';

const SPECIAL_PROMO_PERCENTAGE_VALUE = 40;

const PromoCountDownTimer = ({ endDate }: { endDate: dayjs.ConfigType }) => {
  const countDown = useCountdownTimer(endDate);

  return (
    <span>
      Przecena kończy się: <strong>{countDown}</strong>
    </span>
  );
};

const PromoBox = ({
  specialPromoCookie,
  hidePrice,
  isDark = false,
}: {
  specialPromoCookie: SpecialPromoCookie;
  hidePrice?: boolean;
  isDark?: boolean;
}) => {
  const searchParams = useSearchParams();
  const size = (searchParams.get('size') || '60') as CanvasSize;

  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const isSpecialPromo =
    specialPromoCookie.generationCount === 3 &&
    dayjs(specialPromoCookie.expiresAt).isAfter(dayjs()) &&
    IS_SPECIAL_PROMO_ENABLED;

  if (getIsPromoExpired() && !isSpecialPromo) {
    return null;
  }

  const promoCode = isSpecialPromo ? specialPromoCookie.code || '' : PROMO_CODE;

  const handleCopy = () => {
    copy(promoCode).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const promoPercentageValue = isSpecialPromo ? SPECIAL_PROMO_PERCENTAGE_VALUE : PROMO_PERCENTAGE_VALUE;

  const promoPrice = sizeToPrice[size] * ((100 - promoPercentageValue) / 100);
  const promoPriceRounded = Math.round(promoPrice * 100) / 100;

  return (
    <div
      className={twMerge(
        'flex flex-col gap-2.5 rounded-md bg-warning/20 p-3 text-sm',
        isSpecialPromo && 'bg-accent/20',
      )}
    >
      {isSpecialPromo && <strong>Specjalna oferta na pierwsze zamówienie</strong>}
      <div className="flex items-center gap-2">
        <LocalOfferRoundedIcon className={isSpecialPromo ? 'text-accent' : 'text-warning'} />
        <PromoCountDownTimer endDate={isSpecialPromo ? specialPromoCookie.expiresAt : PROMO_END_DATE} />
      </div>
      <div>
        <strong>{promoPercentageValue}% zniżki</strong>{' '}
        {!hidePrice && (
          <>
            <span className={twMerge('font-bold', isDark ? 'text-primary' : 'text-accent')}>
              {promoPriceRounded} zł
            </span>{' '}
            <span className="line-through">{sizeToPrice[size]}&nbsp;zł</span>
          </>
        )}
      </div>
      <ButtonBase className="block self-start rounded-md py-1" onClick={handleCopy}>
        Użyj kod <strong>{promoCode}</strong>
        <div className="ml-1 inline text-lg">
          {isCopied ? <DoneRoundedIcon className="text-primary" /> : <ContentCopyRoundedIcon />}
        </div>
      </ButtonBase>
    </div>
  );
};

export default PromoBox;
