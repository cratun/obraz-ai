'use client';

import { ReactNode, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Dialog, PaperProps } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import Typography from '@/app/_components/typography';
import { ImageHistoryEntry } from '@/app/generate/_utils/image-history/common';
import actionBuy from '@/app/generate/action-buy';
import { CheckoutMetadata } from '@/app/types';

const getImgUrl = (id: string) => `https://obraz-ai-bucket.s3.eu-central-1.amazonaws.com/${id}.webp`;

export const OrderDetails = ({ children, priceElement }: { children: ReactNode; priceElement: ReactNode }) => {
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

const ImageHistoryDialogPaperComponent = ({ children }: PaperProps) => (
  <AppContainer className="h-full w-full overflow-auto pt-5">
    <AppContainer.Content className="flex flex-col items-center gap-10 text-white lg:flex-row [&>div:last-of-type]:pb-5 lg:[&>div:last-of-type]:pb-0">
      {children}
    </AppContainer.Content>
  </AppContainer>
);

export const ImageHistory = ({
  imageHistory,
  priceElement,
}: {
  imageHistory: ImageHistoryEntry[];
  priceElement: ReactNode;
}) => {
  const [dialogImgId, setDialogImgId] = useState<string | null>(null);

  const buyMutation = useMutation({
    mutationFn: (metadata: CheckoutMetadata) =>
      actionBuy({ cancelUrl: window.location.origin + '/generate', metadata }),
  });

  return (
    <div className="flex flex-col gap-10">
      {!!dialogImgId && (
        <Dialog
          open={!!dialogImgId}
          PaperComponent={ImageHistoryDialogPaperComponent}
          slotProps={{ backdrop: { classes: { root: 'bg-black/80 backdrop-blur-3xl' } } }}
        >
          <div className="relative aspect-square w-full max-w-[600px]">
            <Image alt="Generated image" layout="fill" src={getImgUrl(dialogImgId)} />
          </div>
          <OrderDetails priceElement={priceElement}>
            <AppButton
              className="lg:py-5 lg:text-lg"
              color="neutral"
              size="large"
              variant="outlined"
              onClick={() => setDialogImgId(null)}
            >
              Zamknij
            </AppButton>
            <AppButton
              className="-order-1 lg:order-none lg:py-5 lg:text-lg"
              color="accent"
              loading={buyMutation.isPending}
              size="large"
              startIcon={<ShoppingCartIcon />}
              variant="contained"
              onClick={() => {
                if (!dialogImgId) {
                  return;
                }

                buyMutation.mutate({ imageId: dialogImgId });
              }}
            >
              Kup teraz
            </AppButton>
          </OrderDetails>
        </Dialog>
      )}
      <div className="flex flex-col gap-5">
        <Typography.H3>Twoja galeria wygenerowanych obrazów</Typography.H3>
        <Typography.Body className="max-w-2xl">
          Przeglądaj 20 ostatnich obrazów przechowywanych przez 3 dni. <strong>Kliknij</strong> wybrany projekt, aby
          zobaczyć podgląd i zamówić unikalny obraz na płótnie.
        </Typography.Body>
      </div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {imageHistory.map(({ id }) => (
          <ButtonBase key={id} className="relative aspect-square" onClick={() => setDialogImgId(id)}>
            <Image fill alt="" src={getImgUrl(id)} />
          </ButtonBase>
        ))}
      </div>
    </div>
  );
};
