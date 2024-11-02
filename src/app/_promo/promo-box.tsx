import { useState } from 'react';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import { ButtonBase } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { useCopyToClipboard } from 'usehooks-ts';
import { sizeToPrice } from '@/app/generate/_utils/common';
import { CanvasSize } from '@/app/generate/_utils/sizes-utils';
import useCountdownTimer from './use-countdown-timer';
import { getIsPromoExpired, PROMO_CODE, PROMO_PERCENTAGE_VALUE } from './utils';

const PromoCountDownTimer = () => {
  const countDown = useCountdownTimer();

  return (
    <span>
      Przecena kończy się: <strong>{countDown}</strong>
    </span>
  );
};

const PromoBox = ({ isDark = false }: { isDark?: boolean }) => {
  const searchParams = useSearchParams();
  const size = (searchParams.get('size') || '60') as CanvasSize;

  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  if (getIsPromoExpired()) {
    return null;
  }

  const handleCopy = () => {
    copy(PROMO_CODE).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const promoPrice = sizeToPrice[size] * ((100 - PROMO_PERCENTAGE_VALUE) / 100);
  const promoPriceRounded = Math.round(promoPrice * 100) / 100;

  return (
    <div className="flex flex-col gap-2.5 rounded-md bg-warning/20 p-3 text-sm">
      <div className="flex items-center gap-2">
        <LocalOfferRoundedIcon className="text-warning" />
        <PromoCountDownTimer />
      </div>
      <div>
        <strong>{PROMO_PERCENTAGE_VALUE}% zniżki</strong>{' '}
        <span className={twMerge('font-bold', isDark ? 'text-primary' : 'text-accent')}>{promoPriceRounded} zł</span>{' '}
        <span className="line-through">{sizeToPrice[size]} zł</span>
      </div>
      <ButtonBase className="block self-start rounded-md py-1" onClick={handleCopy}>
        Użyj kod <strong>{PROMO_CODE}</strong>
        <div className="ml-1 inline text-lg">
          {isCopied ? <DoneRoundedIcon className="text-primary" /> : <ContentCopyRoundedIcon />}
        </div>
      </ButtonBase>
    </div>
  );
};

export default PromoBox;
