'use client';

import { ReactNode } from 'react';
import Typography from '@/app/_components/typography';

const OrderDetails = ({ children, priceElement }: { children: ReactNode; priceElement: ReactNode }) => {
  return (
    <div className="flex flex-col gap-10 lg:flex-col-reverse lg:justify-between">
      <div className="flex flex-col gap-2.5 lg:flex-col-reverse lg:gap-5">
        {children}
        <div className="flex flex-col gap-2.5 leading-[150%] tracking-[0.5px] lg:gap-5">
          <span className="text-2xl">Cena: {priceElement}</span>
          <span className="font-semi text-xl">
            Specjalna oferta: <span className="font-semibold">Dostawa gratis!</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Typography.H3>Szczegóły zamówienia</Typography.H3>
        <p className="max-w-xl leading-normal tracking-[0.5px]">
          Obraz na płótnie o wymiarach <strong>50x50 cm</strong>. Druk <strong>wysokiej jakości na płótnie</strong>, z
          wybraną przez Ciebie unikalną grafiką, stworzoną na podstawie Twojego opisu. Doskonały{' '}
          <strong>do powieszenia na ścianie</strong>, gotowy, by ozdobić Twój dom lub biuro.
        </p>
        <ul className="max-w-xl list-disc pl-4 leading-normal tracking-[0.5px]">
          <li>płótno syntetyczne</li>
          <li>zadrukowane krawędzie foto-obrazu</li>
          <li>lekki drewniany blejtram</li>
          <li>wysokiej jakości druk ekologiczny w technologii UV</li>
        </ul>
        <div className="max-w-xl leading-normal tracking-[0.5px]">
          Oczekiwany czas realizacji zamówienia: <strong>3 - 5 dni roboczych.</strong>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
