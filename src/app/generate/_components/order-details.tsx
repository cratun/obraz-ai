'use client';

import { ReactNode } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSearchParams } from 'next/navigation';
import { twJoin } from 'tailwind-merge';
import Typography from '@/app/_components/typography';
import createQueryString from '@/app/_utils/create-query-string';
import { CanvasSize, canvasSizes } from '@/app/generate/_utils/sizes-utils';

// KEEP IN SYNC WITH ENVS
const prices = {
  '30': 90,
  '60': 130,
  '100': 220,
};

const OrderDetails = ({
  children,
  toggleButtonVariant,
}: {
  children: ReactNode;
  toggleButtonVariant: 'primary' | 'secondary';
}) => {
  const searchParams = useSearchParams();
  const size = (searchParams.get('size') || '60') as CanvasSize;

  const handleSizeChange = (_: unknown, newSize: string | null) => {
    if (newSize === null) return;

    const query = createQueryString([{ action: 'add', name: 'size', value: newSize }], searchParams);

    window.history.replaceState(null, '', `?${query}`);
  };

  return (
    <div className="flex flex-col gap-10 lg:flex-col-reverse lg:justify-between">
      <div className="flex flex-col gap-2.5 lg:flex-col-reverse lg:gap-5">
        {children}
        <ToggleButtonGroup
          exclusive
          className="-order-2 max-w-96 gap-2.5 lg:order-none"
          value={size}
          onChange={handleSizeChange}
        >
          {canvasSizes.map((size) => (
            <ToggleButton
              key={size}
              value={size}
              classes={{
                root: 'rounded-full py-1.5 px-2.5',
                selected: twJoin(
                  toggleButtonVariant === 'primary' ? '!text-text !bg-white' : '!text-white !bg-primary',
                ),
                standard: twJoin(
                  toggleButtonVariant === 'primary' ? 'bg-transparent border-white text-white' : 'text-text bg-white',
                ),
              }}
            >
              {size}x{size} cm
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <div className="flex flex-col gap-2.5 leading-[150%] tracking-[0.5px] lg:gap-5">
          <span className="text-2xl">
            Cena: <span className="font-semibold">{prices[size]} zł</span>
          </span>
          <span className="font-semi text-xl">
            Specjalna oferta: <span className="font-semibold">Dostawa gratis!</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Typography.H3>Szczegóły zamówienia</Typography.H3>
        <Typography.Body>
          <strong>Obraz na płótnie</strong> o wymiarach{' '}
          <strong>
            {size}x{size} cm
          </strong>
          . Druk <strong>wysokiej jakości na płótnie</strong>, z wybraną przez Ciebie unikalną grafiką, stworzoną na
          podstawie Twojego opisu. Doskonały <strong>do powieszenia na ścianie</strong>, gotowy, by ozdobić Twój dom lub
          biuro.
        </Typography.Body>
        <ul className="max-w-xl list-disc pl-4 leading-normal tracking-[0.5px]">
          <li>płótno syntetyczne</li>
          <li>zadrukowane krawędzie foto-obrazu</li>
          <li>lekki drewniany blejtram</li>
          <li>wysokiej jakości druk ekologiczny w technologii UV</li>
        </ul>
        <Typography.Body>
          Oczekiwany czas realizacji zamówienia: <strong>3 - 5 dni roboczych.</strong>
        </Typography.Body>
      </div>
    </div>
  );
};

export default OrderDetails;
