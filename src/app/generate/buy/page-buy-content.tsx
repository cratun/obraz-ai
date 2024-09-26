'use client';

import { useEffect, useState } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CircularProgress } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import AppLogo from '@/app/_components/app-logo';
import GenerateInfoLimit from '@/app/_components/generate-limit-info';
import GenerateTextField from '@/app/_components/generate-text-field';
import { GENERATION_STYLES } from '@/app/_utils/constants';
import GenerationStylePicker from '@/app/generate/_components/generation-style-picker';
import actionBuy from '@/app/generate/action-buy';
import actionGenerate from '@/app/generate/action-generate';
import actionGetPrice from '@/app/generate/action-get-price';
import { useGenerationDailyLimit } from '@/app/hooks';
import { CheckoutMetadata } from '@/app/types';

const PageBuyContent = ({ initialPrompt, initialStyleIndex }: { initialPrompt: string; initialStyleIndex: number }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [styleIndex, setStyleIndex] = useState(initialStyleIndex);
  const { consume } = useGenerationDailyLimit();

  const generateMutation = useMutation({
    mutationFn: () => actionGenerate({ prompt, styleIndex }),
    onSuccess: () => consume(),
  });

  const getPriceQuery = useQuery({ queryKey: ['price'], queryFn: () => actionGetPrice() });

  useEffect(() => {
    generateMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buyMutation = useMutation({
    mutationFn: (metadata: CheckoutMetadata) => actionBuy({ cancelUrl: window.location.origin + '/', metadata }),
  });

  const handleRegenerate = () => {
    if (generateMutation.isPending) return;

    generateMutation.mutate();
  };

  return (
    <AppContainer className="py-5">
      <AppContainer.Content className="flex-col gap-10 overflow-auto lg:gap-20">
        <AppLogo className="lg:w-[200px]" />
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-20">
          <h2 className="text-[30px] font-semibold leading-[1.2] text-text lg:basis-[200px]">Opis obrazu</h2>
          <GenerateTextField
            className="grow"
            inputValue={prompt}
            value={prompt}
            onChange={(_, value) => setPrompt(value || '')}
            onInputChange={(_, value) => setPrompt(value)}
          >
            <GenerateInfoLimit />
          </GenerateTextField>
        </div>
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-20">
          <div className="flex flex-col text-[30px] font-semibold leading-[1.2] text-text sm:gap-2.5 lg:basis-[200px]">
            <h2>Wybrany styl:</h2>
            <span className="text-primary">{GENERATION_STYLES[styleIndex][1]}</span>
          </div>
          <GenerationStylePicker
            imgClassName="w-28 lg:w-28"
            styleIndex={styleIndex}
            onStyleIndexChange={setStyleIndex}
          />
        </div>
        <div className="flex lg:gap-20">
          <div className="hidden w-[200px] lg:block" />
          <AppButton
            disabled={buyMutation.isPending || generateMutation.isPending}
            startIcon={<RestartAltIcon />}
            variant="contained"
            classes={{
              contained: 'normal-case font-normal leading-[150%] tracking-[0.5px] px-5 py-2.5 w-fit',
            }}
            onClick={handleRegenerate}
          >
            Stwórz swój obraz ponownie
          </AppButton>
        </div>
        <div className="flex flex-col gap-10 lg:flex-row">
          {generateMutation.isSuccess ? (
            <div className="relative aspect-square w-full max-w-[600px]">
              <Image alt="Generated image" layout="fill" src={generateMutation.data.imgSrc} />
            </div>
          ) : (
            <div className="relative z-[0] aspect-square w-full max-w-[600px] p-5">
              <div className="absolute inset-0 z-[0] animate-pulse rounded-xl bg-primary/30"></div>
              <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-5">
                <CircularProgress />
                <span className="text-sm text-text">Tworzenie obrazu...</span>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-10 lg:flex-col-reverse lg:justify-between">
            <div className="flex flex-col gap-2.5 lg:flex-col-reverse lg:gap-5">
              <AppButton
                className="lg:py-5 lg:text-lg"
                color="accent"
                disabled={generateMutation.isPending}
                loading={buyMutation.isPending}
                size="large"
                startIcon={<ShoppingCartIcon />}
                variant="contained"
                onClick={() => buyMutation.mutate(generateMutation.data?.metadata as CheckoutMetadata)}
              >
                Kup i zapłać
              </AppButton>
              <div className="flex flex-col gap-2.5 lg:gap-5">
                <span className="text-2xl text-text">
                  Cena:{' '}
                  <span className="font-semibold">
                    {getPriceQuery.isLoading ? <CircularProgress size={15} /> : `${getPriceQuery.data! / 100} zł`}
                  </span>{' '}
                  brutto
                </span>
                <span className="font-semi text-xl text-text">
                  Specjalna oferta: <span className="font-semibold">Dostawa gratis!</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-5 text-text">
              <h4 className="text-2xl font-semibold leading-[120%] tracking-[1px]">Szczegóły zamówienia</h4>
              <p className="max-w-xl leading-[150%] tracking-[0.5px]">
                Obraz na płótnie o wymiarach 50x50 cm. Druk wysokiej jakości na płótnie, z wybraną przez Ciebie unikalną
                grafiką, stworzoną na podstawie Twojego opisu. Doskonały do powieszenia na ścianie, gotowy, by ozdobić
                Twój dom lub biuro.
              </p>
              <ul className="max-w-xl list-disc pl-4 leading-[150%] tracking-[0.5px]">
                <li>płótno syntetyczne</li>
                <li>zadrukowane krawędzie foto-obrazu</li>
                <li>lekki drewniany blejtram</li>
                <li>ekologiczny druk w technologii UV</li>
              </ul>
              <div className="max-w-xl font-bold leading-[150%] tracking-[0.5px]">
                Oczekiwany czas realizacji zamówienia: 3 - 5 dni roboczych.
              </div>
            </div>
          </div>
        </div>
      </AppContainer.Content>
    </AppContainer>
  );
};

export default PageBuyContent;
