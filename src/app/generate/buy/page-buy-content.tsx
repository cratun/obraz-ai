'use client';

import { useEffect, useState } from 'react';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { CircularProgress } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { twJoin } from 'tailwind-merge';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import createQueryString from '@/app/_utils/create-query-string';
import GeneratedImageSlider from '@/app/generate/_components/generated-image-slider';
import ImageHistory from '@/app/generate/_components/image-history';
import OrderDetails from '@/app/generate/_components/order-details';
import { desiredMockupImageSizes, GENERATION_TOKEN_LIMIT_REACHED, mockupData } from '@/app/generate/_utils/common';
import { ImageHistoryEntry } from '@/app/generate/_utils/image-history/common';
import { CanvasSize, defaultCanvasSize } from '@/app/generate/_utils/sizes-utils';
import actionBuy from '@/app/generate/action-buy';
import actionGenerate from '@/app/generate/action-generate';
import { CheckoutMetadata, MockupImages } from '@/app/types';
import generateMockup from './generate-mockup';
const PageBuyContent = ({
  initialPrompt,
  initialStyleIndex,
  imageHistory,
}: {
  initialPrompt: string;
  initialStyleIndex: number;
  imageHistory: ImageHistoryEntry[];
}) => {
  const searchParams = useSearchParams();
  const [mockupImages, setMockupImages] = useState<MockupImages | null>(null);

  const generateImageQueryParams = {
    prompt: initialPrompt,
    styleIndex: initialStyleIndex,
    generateKey: 0,
    isRandomPrompt: false,
  };

  const generateImageQuery = useQuery({
    queryKey: ['image', generateImageQueryParams],
    queryFn: () => actionGenerate(generateImageQueryParams),
    gcTime: 0,
  });

  const buyMutation = useMutation({
    mutationFn: (metadata: CheckoutMetadata) =>
      actionBuy({
        cancelUrl: window.location.origin + '/generate',
        metadata,
      }),
  });

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
    <AppContainer className="pb-20 pt-[100px]">
      <AppContainer.Content className="flex-col gap-10 overflow-auto text-text lg:gap-20">
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
          <GeneratedImageSlider
            mockupImages={mockupImages}
            className={twJoin(
              '[--swiper-theme-color:theme(colors.primary)]',
              (!generateImageQuery.isSuccess ||
                generateImageQuery.data === GENERATION_TOKEN_LIMIT_REACHED ||
                generateImageQuery.isFetching) &&
                'hidden',
            )}
            generatedImgSrc={
              generateImageQuery.isSuccess && typeof generateImageQuery.data !== 'string'
                ? generateImageQuery.data.imgSrc
                : '/og-image.png'
            }
          />
          {generateImageQuery.isFetching ? (
            <div className="flex w-full max-w-[700px] shrink-0 flex-col gap-2.5">
              <div className="relative z-[0] aspect-square w-full p-5">
                <div className="absolute inset-0 z-[0] animate-pulse bg-primary/30"></div>
                <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-5">
                  <CircularProgress />
                  <span className="text-sm">Tworzenie obrazu...</span>
                </div>
              </div>
              <div className="static flex w-full items-center justify-center gap-3">
                {Array.from(Array(5).keys()).map((i) => (
                  <span
                    key={i}
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-text opacity-75 md:h-20 md:w-20"
                  >
                    <CircularProgress size={20} />
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <>
              {generateImageQuery.isSuccess ? (
                <>
                  {generateImageQuery.data === GENERATION_TOKEN_LIMIT_REACHED && (
                    <div className="relative flex aspect-square w-full max-w-[700px] flex-col items-center justify-center gap-5 border border-text/20 p-5">
                      <WarningAmberRoundedIcon className="size-24 text-warning" />
                      <span className="max-w-sm text-center text-sm">
                        Twój limit generowania obrazów został wyczerpany. Wróć jutro, aby kontynuować.
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="relative flex aspect-square w-full max-w-[700px] flex-col items-center justify-center gap-5 border border-text/20 p-5">
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
            <AppButton
              className="mb-0 lg:-order-1 lg:py-5 lg:text-lg"
              LinkComponent={Link}
              size="large"
              startIcon={<RefreshIcon />}
              variant="outlined"
              href={`/generate?${createQueryString(
                [
                  { name: 'prompt', value: initialPrompt, action: 'add' },
                  { name: 'styleIndex', value: initialStyleIndex.toString(), action: 'add' },
                ],
                searchParams,
              )}`}
            >
              Stwórz nowy obraz
            </AppButton>
          </OrderDetails>
        </div>
        {imageHistory.length > 0 && <ImageHistory imageHistory={imageHistory} />}
      </AppContainer.Content>
    </AppContainer>
  );
};

export default PageBuyContent;
