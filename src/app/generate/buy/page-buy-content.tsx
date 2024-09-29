'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { CircularProgress } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import AppLogo from '@/app/_components/app-logo';
import GenerateTextField from '@/app/_components/generate-text-field';
import { GENERATION_STYLES } from '@/app/_utils/constants';
import GenerationStylePicker from '@/app/generate/_components/generation-style-picker';
import GenerateInfoLimit from '@/app/generate/_components/generation-token-limit-info';
import { GENERATION_TOKEN_LIMIT_REACHED } from '@/app/generate/_utils/common';
import { ParsedGenerationTokenCookie } from '@/app/generate/_utils/get-generation-token-count-cookie';
import actionBuy from '@/app/generate/action-buy';
import actionGenerate from '@/app/generate/action-generate';
import { CheckoutMetadata } from '@/app/types';

const PageBuyContent = ({
  initialPrompt,
  initialStyleIndex,
  priceElement,
  generationTokenCountCookie,
}: {
  initialPrompt: string;
  initialStyleIndex: number;
  generationTokenCountCookie: ParsedGenerationTokenCookie;
  priceElement: ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState(initialPrompt);
  const [styleIndex, setStyleIndex] = useState(initialStyleIndex);

  const [generateImageQueryParams, setGenerateImageQueryParams] = useState({
    prompt: initialPrompt,
    styleIndex: initialStyleIndex,
    generateKey: 0,
  });

  const generateImageQuery = useQuery({
    queryKey: ['image', generateImageQueryParams],
    queryFn: () => actionGenerate(generateImageQueryParams),
  });

  useEffect(() => {
    if (generateImageQuery.isFetching && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
    }
  }, [generateImageQuery.isFetching]);

  const buyMutation = useMutation({
    mutationFn: (metadata: CheckoutMetadata) => actionBuy({ cancelUrl: window.location.origin + '/', metadata }),
  });

  const handleRegenerate = () => {
    setGenerateImageQueryParams((prevValue) => ({ prompt, styleIndex, generateKey: prevValue.generateKey + 1 }));
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
            <GenerateInfoLimit generationTokenCountCookie={generationTokenCountCookie} />
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
            disabled={buyMutation.isPending || generateImageQuery.isFetching || generationTokenCountCookie.value === 0}
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
        <div ref={ref} className="flex flex-col gap-10 lg:flex-row">
          {generateImageQuery.isFetching ? (
            <div className="relative z-[0] aspect-square w-full max-w-[600px] p-5">
              <div className="absolute inset-0 z-[0] animate-pulse rounded-xl bg-primary/30"></div>
              <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-5">
                <CircularProgress />
                <span className="text-sm text-text">Tworzenie obrazu...</span>
              </div>
            </div>
          ) : (
            <>
              {generateImageQuery.isSuccess ? (
                <>
                  {generateImageQuery.data === GENERATION_TOKEN_LIMIT_REACHED ? (
                    <div className="relative flex aspect-square w-full max-w-[600px] flex-col items-center justify-center gap-5 border border-text/20">
                      <WarningAmberRoundedIcon className="size-24 text-warning" />
                      <span className="max-w-sm text-center text-sm text-text">
                        Twój limit generowania obrazów został wyczerpany. Wróć jutro, aby kontynuować.
                      </span>
                    </div>
                  ) : (
                    <div className="relative aspect-square w-full max-w-[600px]">
                      <Image alt="Generated image" layout="fill" src={generateImageQuery.data.imgSrc} />
                    </div>
                  )}
                </>
              ) : (
                <div className="relative flex aspect-square w-full max-w-[600px] flex-col items-center justify-center gap-5 border border-text/20">
                  <ErrorOutlineRoundedIcon className="size-24 text-error" />
                  <span className="max-w-sm text-center text-sm text-text">
                    Wystąpił nieoczekiwany błąd, spróbuj ponownie lub skontaktuj się z nami.
                  </span>
                </div>
              )}
            </>
          )}
          <div className="flex flex-col gap-10 lg:flex-col-reverse lg:justify-between">
            <div className="flex flex-col gap-2.5 lg:flex-col-reverse lg:gap-5">
              <AppButton
                className="lg:py-5 lg:text-lg"
                color="accent"
                disabled={!generateImageQuery.isSuccess || generateImageQuery.data === GENERATION_TOKEN_LIMIT_REACHED}
                loading={buyMutation.isPending}
                size="large"
                startIcon={<ShoppingCartIcon />}
                variant="contained"
                onClick={() => {
                  if (!generateImageQuery.isSuccess || generateImageQuery.data === GENERATION_TOKEN_LIMIT_REACHED) {
                    return;
                  }

                  buyMutation.mutate(generateImageQuery.data.metadata);
                }}
              >
                Kup teraz
              </AppButton>
              <div className="flex flex-col gap-2.5 leading-[150%] tracking-[0.5px] text-text lg:gap-5">
                <span className="text-2xl">Cena: {priceElement}</span>
                <span className="font-semi text-xl">
                  Specjalna oferta: <span className="font-semibold">Dostawa gratis!</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-5 text-text">
              <h2 className="text-2xl font-semibold leading-[120%] tracking-[1px]">Szczegóły zamówienia</h2>
              <p className="max-w-xl leading-normal tracking-[0.5px]">
                Obraz na płótnie o wymiarach <strong>50x50 cm</strong>. Druk{' '}
                <strong>wysokiej jakości na płótnie</strong>, z wybraną przez Ciebie unikalną grafiką, stworzoną na
                podstawie Twojego opisu. Doskonały <strong>do powieszenia na ścianie</strong>, gotowy, by ozdobić Twój
                dom lub biuro.
              </p>
              <ul className="max-w-xl list-disc pl-4 leading-normal tracking-[0.5px]">
                <li>płótno syntetyczne</li>
                <li>zadrukowane krawędzie foto-obrazu</li>
                <li>lekki drewniany blejtram</li>
                <li>wysokiej jakości druk ekologiczny w technologii UV</li>
              </ul>
              <div className="max-w-xl font-bold leading-normal tracking-[0.5px]">
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
