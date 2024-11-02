'use client';

import { ReactNode } from 'react';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSearchParams } from 'next/navigation';
import { twJoin } from 'tailwind-merge';
import PaymentMethodsList from '@/app/_components/payments-methods-list';
import Typography from '@/app/_components/typography';
import createQueryString from '@/app/_utils/create-query-string';
import { CanvasSize, canvasSizes } from '@/app/generate/_utils/sizes-utils';
import ProductDetails from './product-details';
// KEEP IN SYNC WITH ENVS
const prices = {
  '30': 89,
  '60': 129,
  '100': 219,
};

const Hr = () => <hr className="text-text/30" />;

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
    <div className="flex w-full flex-col gap-5">
      <Typography.H2 className="hidden lg:block">Obraz na płótnie</Typography.H2>
      <div className="flex flex-col gap-1">
        <Typography.Body className="text-sm font-medium">Wybierz rozmiar</Typography.Body>
        <ToggleButtonGroup exclusive className="max-w-96 gap-2.5" value={size} onChange={handleSizeChange}>
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
      </div>
      <span className="text-3xl font-bold">{prices[size]} zł</span>
      {children}
      <div className="flex items-center gap-1 text-xs font-bold">
        <AccessTimeRoundedIcon className="text-base" /> <span>Czas dostawy: 3 - 5 dni roboczych</span>{' '}
      </div>
      <div className="flex items-center gap-1 text-xs font-bold">
        <PriorityHighRoundedIcon className="text-base" /> <span>Darmowa dostawa</span>{' '}
      </div>
      <Hr />
      <PaymentMethodsList />
      <Typography.H3 className="lg:hidden">Szczegóły produktu</Typography.H3>
      <Hr />
      <ProductDetails Icon={InfoOutlinedIcon} title="O tym obrazie">
        <ProductDetails.Section description={`${size}x${size} cm`} title="Rozmiar" />
        <ProductDetails.Section description="płótno syntetyczne" title="Materiał" />
        <ProductDetails.Section description="zadrukowane krawędzie foto-obrazu" title="Wykończenie" />
        <ProductDetails.Section description="lekki drewniany blejtram" title="Rama" />
        <ProductDetails.Section description="wysokiej jakości druk ekologiczny w technologii UV" title="Druk" />
      </ProductDetails>
      <Hr />
      <ProductDetails Icon={LocalShippingOutlinedIcon} title="Informacje o dostawie">
        <ProductDetails.Section
          description="oczekiwany czas dostawy: 3&nbsp;-&nbsp;5 dni roboczych. Może się wydłużyć w okresach świątecznych"
          title="Czas"
        />
        <ProductDetails.Section
          description="zamawiając, otrzymujesz obraz tworzony specjalnie według Twojego pomysłu – dlatego realizacja zamówienia jest ostateczna i nie podlega zwrotowi"
          title="Zwroty"
        />
        <ProductDetails.Section
          description="pakujemy obrazy tak, aby trafiły do Ciebie w perfekcyjnym stanie"
          title="Opakowanie"
        />
      </ProductDetails>

      <Hr />
    </div>
  );
};

export default OrderDetails;
