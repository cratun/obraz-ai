'use client';

import { useEffect } from 'react';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { twJoin } from 'tailwind-merge';
import BuyButtonSlide, { useSlideInOnScrollDown } from '@/app/(main-layout)/generate/_components/buy-button-slide';
import GeneratedImageSlider from '@/app/(main-layout)/generate/_components/generated-image-slider';
import ImageHistory from '@/app/(main-layout)/generate/_components/image-history';
import OrderDetails from '@/app/(main-layout)/generate/_components/order-details';
import { GENERATION_TOKEN_LIMIT_REACHED } from '@/app/(main-layout)/generate/_utils/common';
import { ImageHistoryEntry } from '@/app/(main-layout)/generate/_utils/image-history/common';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import PromoBox from '@/app/_promo/promo-box';
import { SpecialPromoCookie } from '@/app/_promo/special-promo-cookie';
import { getCanvasSizeFromQueryParam } from '@/app/_utils/sizes-utils';
import useGenerateMocks from '@/app/_utils/use-generate-mocks';
import AddToCartButton from '@/app/cart/components/add-to-cart-button';
import actionGeneratePortrait from './action-generate-portrait';

const PageBuyContentPortrait = ({
  image,
  template,
  imageHistory,
  specialPromoCookie,
}: {
  image: string;
  template: string;
  imageHistory: ImageHistoryEntry[];
  specialPromoCookie: SpecialPromoCookie;
}) => {
  const searchParams = useSearchParams();
  const { generateMockupUrl, mockupImages } = useGenerateMocks();
  const { ref, slideIn } = useSlideInOnScrollDown();

  const generatePortraitQueryParams = {
    image: decodeURIComponent(image),
    template,
  };

  const generatePortraitQuery = useQuery({
    queryKey: ['portrait', generatePortraitQueryParams],
    queryFn: () => actionGeneratePortrait(generatePortraitQueryParams),
    gcTime: 0,
  });

  const canvasSize = getCanvasSizeFromQueryParam(searchParams.get('size'));

  useEffect(() => {
    if (!generatePortraitQuery.isSuccess) return;
    if (generatePortraitQuery.data.errorCode === GENERATION_TOKEN_LIMIT_REACHED) return;

    generateMockupUrl(generatePortraitQuery.data.imgSrc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatePortraitQuery.data, generatePortraitQuery.isSuccess]);

  const isBuyButtonDisabled =
    !generatePortraitQuery.isSuccess || generatePortraitQuery.data.errorCode === GENERATION_TOKEN_LIMIT_REACHED;

  return (
    <AppContainer className="pb-20 pt-[--save-navbar-padding-top]">
      <BuyButtonSlide
        disabled={isBuyButtonDisabled}
        slideIn={slideIn}
        cartItemData={{
          canvasSize,
          imageId: generatePortraitQuery.data?.metadata.imageId as string,
          creationDateTimestamp: generatePortraitQuery.data?.metadata.creationDateTimestamp as number,
          type: 'portrait',
        }}
        isVisible={
          !generatePortraitQuery.isPending && generatePortraitQuery.data?.errorCode !== GENERATION_TOKEN_LIMIT_REACHED
        }
      />
      <AppContainer.Content className="flex-col gap-10 overflow-auto text-text lg:gap-20">
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
          <GeneratedImageSlider
            mockupImages={mockupImages}
            className={twJoin(
              '[--swiper-theme-color:theme(colors.primary)]',
              (!generatePortraitQuery.isSuccess ||
                generatePortraitQuery.data.errorCode === GENERATION_TOKEN_LIMIT_REACHED ||
                generatePortraitQuery.isFetching) &&
                'hidden',
            )}
            generatedImgSrc={
              generatePortraitQuery.isSuccess &&
              generatePortraitQuery.data.errorCode !== 'GENERATION_TOKEN_LIMIT_REACHED'
                ? generatePortraitQuery.data.imgSrc
                : '/og-image.png'
            }
          />
          {generatePortraitQuery.isFetching ? (
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
              {generatePortraitQuery.isSuccess ? (
                <>
                  {generatePortraitQuery.data.errorCode === GENERATION_TOKEN_LIMIT_REACHED && (
                    <div className="relative flex aspect-square w-full max-w-[700px] flex-col items-center justify-center gap-5 border border-text/20 p-5">
                      <WarningAmberRoundedIcon className="size-24 text-warning" />
                      <div className="flex max-w-sm flex-col text-center text-sm">
                        <span>Limit generowania na dziś wyczerpany.</span>
                        <span>Wróć jutro lub zamów swoje dotychczasowe dzieło jako obraz!</span>
                      </div>
                      <AppButton
                        color="accent"
                        href="/gallery"
                        LinkComponent={Link}
                        startIcon={<PhotoLibraryRoundedIcon className="text-base" />}
                        variant="contained"
                      >
                        Kup obraz ze swojej galerii
                      </AppButton>
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
          <OrderDetails toggleButtonVariant="secondary" type="portrait">
            <PromoBox specialPromoCookie={specialPromoCookie} type="portrait" />
            <div className="flex flex-col gap-2.5">
              <AddToCartButton
                buttonRef={ref}
                disabled={isBuyButtonDisabled}
                cartItemData={{
                  canvasSize,
                  type: 'portrait',
                  imageId: generatePortraitQuery.data?.metadata.imageId as string,
                  creationDateTimestamp: generatePortraitQuery.data?.metadata.creationDateTimestamp as number,
                }}
              />
              <AppButton
                className="mb-0 py-3 lg:py-5 lg:text-lg"
                href={`/generate/portrait`}
                LinkComponent={Link}
                size="large"
                startIcon={<RefreshRoundedIcon />}
                variant="contained"
              >
                Stwórz nowy portret
              </AppButton>
            </div>
          </OrderDetails>
        </div>
        {imageHistory.length > 0 && (
          <ImageHistory imageHistory={imageHistory} specialPromoCookie={specialPromoCookie} />
        )}
      </AppContainer.Content>
    </AppContainer>
  );
};

export default PageBuyContentPortrait;
