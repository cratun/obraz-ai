'use client';

import { ReactNode, useEffect, useState } from 'react';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Dialog, IconButton, PaperProps } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { IMAGE_HISTORY_EXPIRY_DAYS, ImageHistoryEntry } from '@/app/(main-layout)/generate/_utils/image-history/common';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import Typography from '@/app/_components/typography';
import PromoBox from '@/app/_promo/promo-box';
import { SpecialPromoCookie } from '@/app/_promo/special-promo-cookie';
import { getBucketImgUrl } from '@/app/_utils/common';
import { getCanvasSizeFromQueryParam } from '@/app/_utils/sizes-utils';
import useGenerateMocks from '@/app/_utils/use-generate-mocks';
import AddToCartButton from '@/app/cart/components/add-to-cart-button';
import GeneratedImageSlider from './generated-image-slider';
import OrderDetails from './order-details';

const ImageHistoryDialogPaperComponent = ({ children }: PaperProps) => (
  <AppContainer className="h-full w-full overflow-auto pt-5">
    <AppContainer.Content className="my-auto flex h-fit w-full flex-col">{children}</AppContainer.Content>
  </AppContainer>
);

const ImageHistoryDialogContent = ({
  specialPromoCookie,
  imgHistoryEntry,
  onClose,
}: {
  specialPromoCookie: SpecialPromoCookie;
  imgHistoryEntry: ImageHistoryEntry;
  onClose: () => void;
}) => {
  const generatedImgSrc = getBucketImgUrl(imgHistoryEntry.id);
  const searchParams = useSearchParams();
  const { generateMockupUrl, mockupImages } = useGenerateMocks();

  useEffect(() => {
    generateMockupUrl(generatedImgSrc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatedImgSrc]);

  return (
    <>
      <IconButton disableRipple className="w-full" onClick={onClose}>
        <CloseRoundedIcon className="ml-auto text-4xl text-white" />
      </IconButton>
      <div className="flex flex-col gap-5 pb-10 text-white lg:flex-row lg:gap-10 [&>div:last-of-type]:pb-5 lg:[&>div:last-of-type]:pb-0">
        <GeneratedImageSlider
          className="[--swiper-theme-color:theme(colors.white)]"
          generatedImgSrc={generatedImgSrc}
          mockupImages={mockupImages}
        />
        <OrderDetails toggleButtonVariant="primary">
          <PromoBox isDark specialPromoCookie={specialPromoCookie} />
          <div className="flex flex-col gap-2.5">
            <AddToCartButton
              cartItemData={{
                canvasSize: getCanvasSizeFromQueryParam(searchParams.get('size')),
                imageId: imgHistoryEntry.id,
                creationDateTimestamp: imgHistoryEntry.timestamp,
              }}
            />
            <AppButton
              className="py-[11px] lg:py-5 lg:text-lg"
              color="neutral"
              href="/generate"
              LinkComponent={Link}
              size="large"
              startIcon={<RefreshIcon />}
              variant="contained"
              onClick={onClose}
            >
              Stwórz kolejny obraz
            </AppButton>
          </div>
        </OrderDetails>
      </div>
    </>
  );
};

const ImageHistory = ({
  imageHistory,
  children,
  specialPromoCookie,
}: {
  specialPromoCookie: SpecialPromoCookie;
  imageHistory: ImageHistoryEntry[];
  children?: ReactNode;
}) => {
  const [imgHistoryEntry, setImgHistoryEntry] = useState<ImageHistoryEntry | null>(null);

  const onClose = () => setImgHistoryEntry(null);

  return (
    <div className="flex grow flex-col gap-10">
      {!!imgHistoryEntry && (
        <Dialog
          open={!!imgHistoryEntry}
          PaperComponent={ImageHistoryDialogPaperComponent}
          slotProps={{
            backdrop: { classes: { root: 'bg-black/80 backdrop-blur-3xl [transform:translate3d(0,0,0)]' } },
          }}
          onClose={onClose}
        >
          <ImageHistoryDialogContent
            imgHistoryEntry={imgHistoryEntry}
            specialPromoCookie={specialPromoCookie}
            onClose={onClose}
          />
        </Dialog>
      )}
      <div className="flex flex-col gap-5">
        <Typography.H3>Galeria Twoich obrazów ({imageHistory.length})</Typography.H3>
        <div className="max-w-2xl text-text">
          <ul className="flex list-disc flex-col gap-1.5 pl-4">
            <li className="text-base leading-[1.2] tracking-[0.5px]">
              Przechowuj do <strong>40 ostatnich</strong> obrazów przez <strong>{IMAGE_HISTORY_EXPIRY_DAYS} dni</strong>
            </li>
            <li className="text-base leading-[1.2] tracking-[0.5px]">
              <strong>Kliknij</strong>, aby zobaczyć podgląd i zamówić
            </li>
          </ul>
        </div>
        {children}
      </div>
      {imageHistory.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {imageHistory.map((item) => (
            <ButtonBase key={item.id} className="relative aspect-square" onClick={() => setImgHistoryEntry(item)}>
              {/* NOTE: disable easy image copying */}
              <div className="absolute inset-0 z-[2]" />
              <Image
                fill
                unoptimized
                alt=""
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                src={getBucketImgUrl(item.id)}
              />
              <div className="absolute bottom-0 left-0 z-[1] rounded-tr-full bg-white/25 p-1">
                <ShoppingCartRoundedIcon className="mr-2 mt-2 text-xl text-white" />
              </div>
            </ButtonBase>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 text-center md:pt-10">
          <Image alt="Ikona pustej galerii" height={150} src="/empty-gallery.svg" width={150} />
          <Typography.H4>Zacznij tworzyć, a Twoje obrazy pojawią się tutaj!</Typography.H4>
          <AppButton
            className="px-10"
            href="/generate"
            LinkComponent={Link}
            size="large"
            startIcon={<AutoAwesomeRoundedIcon />}
            variant="contained"
          >
            Przejdź do kreatora
          </AppButton>
        </div>
      )}
    </div>
  );
};

export default ImageHistory;
