'use client';

import { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CircularProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import AppLogo from '@/app/_components/app-logo';
import GenerateTextField from '@/app/_components/generate-text-field';
import { GENERATION_STYLES } from '@/app/_utils/constants';
import GenerationStylePicker from '@/app/generate/_components/generation-style-picker';
import actionBuy from '@/app/generate/action-buy';
import actionGenerate from '@/app/generate/action-generate';
import { useGenerationDailyLimit } from '@/app/hooks';
import { CheckoutMetadata } from '@/app/types';

const PageContent = ({ initialPrompt, initialStyleIndex }: { initialPrompt: string; initialStyleIndex: number }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [styleIndex, setStyleIndex] = useState(initialStyleIndex);
  const { consume } = useGenerationDailyLimit();

  const generateMutation = useMutation({
    mutationFn: () => actionGenerate({ prompt, styleIndex }),
    onSuccess: () => consume(),
  });

  useEffect(() => {
    generateMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buyMutation = useMutation({
    mutationFn: (metadata: CheckoutMetadata) => actionBuy({ cancelUrl: window.location.origin + '/', metadata }),
  });

  return (
    <AppContainer className="py-5">
      <AppContainer.Content className="flex-col gap-10 overflow-auto lg:gap-20">
        <AppLogo className="lg:w-[200px]" />
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-20">
          <h2 className="text-[30px] font-semibold leading-[1.2] text-text lg:basis-[200px]">Twój prompt</h2>
          <GenerateTextField
            className="grow"
            inputValue={prompt}
            value={prompt}
            onChange={(_, value) => setPrompt(value || '')}
            onInputChange={(_, value) => setPrompt(value)}
          />
        </div>
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-20">
          <div className="flex flex-col text-[30px] font-semibold leading-[1.2] text-text sm:gap-2.5 lg:basis-[200px]">
            <h2>Wybierz styl:</h2>
            <span className="text-primary">{GENERATION_STYLES[styleIndex][1]}</span>
          </div>
          <GenerationStylePicker
            imgClassName="w-28 lg:w-28"
            styleIndex={styleIndex}
            onStyleIndexChange={setStyleIndex}
          />
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
                <div className="text-sm text-text">Tworzenie obrazu...</div>
              </div>
            </div>
          )}
          <div className="flex flex-col lg:flex-col-reverse lg:justify-between">
            <div className="flex flex-col gap-2.5 lg:flex-col-reverse lg:gap-5">
              <AppButton
                className="lg:py-5 lg:text-lg"
                color="accent"
                loading={buyMutation.isPending || !generateMutation.isSuccess}
                size="large"
                startIcon={<ShoppingCartIcon />}
                variant="contained"
                onClick={() => buyMutation.mutate(generateMutation.data?.metadata as CheckoutMetadata)}
              >
                Kup i zapłać
              </AppButton>
              <div className="text-lg text-text">
                Cena: <span className="font-semibold">199.99 zł</span>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 text-text lg:gap-5">
              <div className="text-2xl font-semibold">Szczegóły zamówienia</div>
              <div>obraz o wymiarach 50x50, wydrukowane płótnie, coś tam jakieś szczegóły jeszcze</div>
            </div>
          </div>
        </div>
      </AppContainer.Content>
    </AppContainer>
  );
};

export default PageContent;
