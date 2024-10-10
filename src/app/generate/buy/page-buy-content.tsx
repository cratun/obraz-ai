'use client';

import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { CircularProgress } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import AppLogo from '@/app/_components/app-logo';
import GenerateTextField from '@/app/_components/generate-text-field';
import { GENERATION_DATA, MAX_PROMPT_LENGTH } from '@/app/_utils/constants';
import GeneratedImageSlider from '@/app/generate/_components/generated-image-slider';
import GenerationStylePicker from '@/app/generate/_components/generation-style-picker';
import GenerateInfoLimit from '@/app/generate/_components/generation-token-limit-info';
import ImageHistory from '@/app/generate/_components/image-history';
import OrderDetails from '@/app/generate/_components/order-details';
import { desiredMockupImageSizes, GENERATION_TOKEN_LIMIT_REACHED, mockupData } from '@/app/generate/_utils/common';
import { ParsedGenerationTokenCookie } from '@/app/generate/_utils/generation-token';
import { ImageHistoryEntry } from '@/app/generate/_utils/image-history/common';
import { CanvasSize, defaultCanvasSize } from '@/app/generate/_utils/sizes-utils';
import actionBuy from '@/app/generate/action-buy';
import actionGenerate from '@/app/generate/action-generate';
import { CheckoutMetadata, MockupImages } from '@/app/types';
import generateMockup from './generate-mockup';

const PageBuyContent = ({
  initialPrompt,
  initialStyleIndex,
  generationTokenCountCookie,
  imageHistory,
}: {
  initialPrompt: string;
  initialStyleIndex: number;
  generationTokenCountCookie: ParsedGenerationTokenCookie;
  imageHistory: ImageHistoryEntry[];
}) => {
  const searchParams = useSearchParams();
  const [mockupImages, setMockupImages] = useState<MockupImages | null>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm({ defaultValues: { prompt: initialPrompt } });
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
    if (generateImageQuery.isFetching && imgContainerRef.current) {
      imgContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
    }
  }, [generateImageQuery.isFetching]);

  const buyMutation = useMutation({
    mutationFn: (metadata: CheckoutMetadata) =>
      actionBuy({
        cancelUrl: window.location.origin + '/generate',
        metadata,
      }),
  });

  const handleGenerate = ({ prompt }: { prompt: string }) => {
    if (!prompt) {
      inputRef.current?.focus();
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

      return;
    }
    setMockupImages(null);
    setGenerateImageQueryParams((prevValue) => ({ prompt, styleIndex, generateKey: prevValue.generateKey + 1 }));
  };

  useEffect(() => {
    if (!generateImageQuery.isSuccess) return;

    const generateMockupUrl = async () => {
      if (generateImageQuery.data === GENERATION_TOKEN_LIMIT_REACHED) return;
      const sizeEntries = Object.entries(desiredMockupImageSizes);
      const allMockupImages: MockupImages = {};

      for (const [key, value] of sizeEntries) {
        const promises = mockupData.map((el) => {
          if (generateImageQuery.data === GENERATION_TOKEN_LIMIT_REACHED) throw new Error('Token limit reached');

          return generateMockup(
            `/mocks/${el.imageName}.png`,
            generateImageQuery.data.imgSrc,
            el.positions[key as CanvasSize],
            value,
          );
        });

        const images = await Promise.all(promises);
        allMockupImages[key] = images;
      }

      setMockupImages(allMockupImages);
    };

    generateMockupUrl();
  }, [generateImageQuery.data, generateImageQuery.isSuccess]);

  return (
    <AppContainer className="py-5">
      <AppContainer.Content className="flex-col gap-10 overflow-auto text-text lg:gap-20">
        <AppLogo className="lg:w-[200px]" />
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-20">
          <h2 className="text-[30px] font-semibold leading-[1.2] lg:basis-[200px]">Opis obrazu</h2>
          <Controller
            control={form.control}
            name="prompt"
            render={({ field, fieldState }) => (
              <GenerateTextField
                className="grow"
                inputValue={field.value}
                value={field.value}
                TextFieldProps={{
                  inputRef: (event) => {
                    field.ref(event);
                    inputRef.current = event;
                  },
                  error: fieldState.invalid,
                  helperText: fieldState.error?.message,
                }}
                onBlur={field.onBlur}
                onChange={(_, value) => field.onChange(value || '')}
                onInputChange={(_, value) => field.onChange(value)}
              >
                <GenerateInfoLimit generationTokenCountCookie={generationTokenCountCookie} />
              </GenerateTextField>
            )}
            rules={{
              maxLength: {
                value: MAX_PROMPT_LENGTH,
                message: `Maksymalna długość opisu to ${MAX_PROMPT_LENGTH} znaków.`,
              },
            }}
          ></Controller>
        </div>
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-20">
          <div className="flex flex-col text-[30px] font-semibold leading-[1.2] sm:gap-2.5 lg:basis-[200px]">
            <h2>Wybrany styl:</h2>
            <span className="text-primary">{GENERATION_DATA[styleIndex][1]}</span>
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
            onClick={form.handleSubmit(handleGenerate)}
          >
            Stwórz swój obraz ponownie
          </AppButton>
        </div>
        <div ref={imgContainerRef} className="flex flex-col gap-10 lg:flex-row">
          {generateImageQuery.isFetching ? (
            <div className="relative z-[0] aspect-square w-full max-w-[600px] shrink-0 p-5">
              <div className="absolute inset-0 z-[0] animate-pulse rounded-xl bg-primary/30"></div>
              <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-5">
                <CircularProgress />
                <span className="text-sm">Tworzenie obrazu...</span>
              </div>
            </div>
          ) : (
            <>
              {generateImageQuery.isSuccess ? (
                <>
                  {generateImageQuery.data === GENERATION_TOKEN_LIMIT_REACHED ? (
                    <div className="relative flex aspect-square w-full max-w-[600px] flex-col items-center justify-center gap-5 border border-text/20">
                      <WarningAmberRoundedIcon className="size-24 text-warning" />
                      <span className="max-w-sm text-center text-sm">
                        Twój limit generowania obrazów został wyczerpany. Wróć jutro, aby kontynuować.
                      </span>
                    </div>
                  ) : (
                    <GeneratedImageSlider
                      className="[--swiper-theme-color:theme(colors.primary)]"
                      generatedImgSrc={generateImageQuery.data.imgSrc}
                      mockupImages={mockupImages || ([] as unknown as MockupImages)}
                    />
                  )}
                </>
              ) : (
                <div className="relative flex aspect-square w-full max-w-[600px] flex-col items-center justify-center gap-5 border border-text/20">
                  <ErrorOutlineRoundedIcon className="size-24 text-error" />
                  <span className="max-w-sm text-center text-sm">
                    Wystąpił nieoczekiwany błąd, spróbuj ponownie lub skontaktuj się z nami.
                  </span>
                </div>
              )}
            </>
          )}
          <OrderDetails toggleButtonVariant="secondary">
            <AppButton
              className="mb-0 lg:py-5 lg:text-lg"
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

                buyMutation.mutate({
                  imageId: generateImageQuery.data.metadata.imageId,
                  size: searchParams.get('size') || defaultCanvasSize,
                });
              }}
            >
              Kup teraz
            </AppButton>
          </OrderDetails>
        </div>
        {imageHistory.length > 0 && <ImageHistory imageHistory={imageHistory} />}
      </AppContainer.Content>
    </AppContainer>
  );
};

export default PageBuyContent;
