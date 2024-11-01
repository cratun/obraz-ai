import { useEffect, useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Dialog, IconButton, PaperProps } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import Typography from '@/app/_components/typography';
import { getBucketImgUrl } from '@/app/_utils/common';
import { desiredMockupImageSizes, mockupData } from '@/app/generate/_utils/common';
import { IMAGE_HISTORY_MAX_ENTRIES, ImageHistoryEntry } from '@/app/generate/_utils/image-history/common';
import { CanvasSize, defaultCanvasSize } from '@/app/generate/_utils/sizes-utils';
import actionBuy from '@/app/generate/action-buy';
import generateMockup from '@/app/generate/buy/generate-mockup';
import { CheckoutMetadata, MockupImages } from '@/app/types';
import GeneratedImageSlider from './generated-image-slider';
import OrderDetails from './order-details';

const ImageHistoryDialogPaperComponent = ({ children }: PaperProps) => (
  <AppContainer className="h-full w-full overflow-auto pt-5">
    <AppContainer.Content className="my-auto flex h-fit w-full flex-col">{children}</AppContainer.Content>
  </AppContainer>
);

const ImageHistoryDialogContent = ({ dialogImgId, onClose }: { dialogImgId: string; onClose: () => void }) => {
  const generatedImgSrc = getBucketImgUrl(dialogImgId);
  const searchParams = useSearchParams();

  const [mockupImages, setMockupImages] = useState<MockupImages | null>(null);
  const buyMutation = useMutation({
    mutationFn: (metadata: CheckoutMetadata) =>
      actionBuy({
        cancelUrl: window.location.origin + '/generate',
        metadata,
      }),
  });

  useEffect(() => {
    const generateMockupUrl = async () => {
      const sizeEntries = Object.entries(desiredMockupImageSizes);
      const allMockupImages: MockupImages = {};

      for (const [sizeKey, maxUserImageSize] of sizeEntries) {
        const promises = mockupData.map((el) => {
          return generateMockup(
            `/mocks/${el.imageName}.png`,
            generatedImgSrc,
            el.positions[sizeKey as CanvasSize],
            maxUserImageSize,
          );
        });

        const images = await Promise.all(promises);
        allMockupImages[sizeKey] = images;
      }

      setMockupImages(allMockupImages);
    };

    generateMockupUrl();
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
          <AppButton
            className="py-3 lg:py-5 lg:text-lg"
            color="accent"
            loading={buyMutation.isPending}
            size="large"
            startIcon={<ShoppingCartIcon />}
            variant="contained"
            onClick={() =>
              buyMutation.mutate({ imageId: dialogImgId, size: searchParams.get('size') || defaultCanvasSize })
            }
          >
            Kup teraz
          </AppButton>
          <AppButton
            className="py-2.5 lg:py-5 lg:text-lg"
            color="neutral"
            href="/generate"
            LinkComponent={Link}
            size="large"
            startIcon={<RefreshIcon />}
            variant="outlined"
            onClick={onClose}
          >
            Stwórz kolejny obraz
          </AppButton>
        </OrderDetails>
      </div>
    </>
  );
};

const ImageHistory = ({ imageHistory }: { imageHistory: ImageHistoryEntry[] }) => {
  const [dialogImgId, setDialogImgId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-10">
      {!!dialogImgId && (
        <Dialog
          open={!!dialogImgId}
          PaperComponent={ImageHistoryDialogPaperComponent}
          slotProps={{ backdrop: { classes: { root: 'bg-black/80 backdrop-blur-3xl' } } }}
          onClose={() => setDialogImgId(null)}
        >
          <ImageHistoryDialogContent dialogImgId={dialogImgId} onClose={() => setDialogImgId(null)} />
        </Dialog>
      )}
      <div className="flex flex-col gap-5">
        <Typography.H3>Twoja galeria wygenerowanych obrazów ({imageHistory.length})</Typography.H3>
        <Typography.Body className="max-w-2xl">
          Przeglądaj <strong>{IMAGE_HISTORY_MAX_ENTRIES} ostatnich</strong> obrazów przechowywanych przez{' '}
          <strong>3 dni</strong>. <strong>Kliknij</strong> wybrany projekt, aby zobaczyć podgląd i zamówić unikalny
          obraz na płótnie.
        </Typography.Body>
      </div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {imageHistory.map(({ id }) => (
          <ButtonBase key={id} className="relative aspect-square" onClick={() => setDialogImgId(id)}>
            {/* NOTE: disable easy image copying */}
            <div className="absolute inset-0 z-[1]" />
            <Image
              fill
              unoptimized
              alt=""
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              src={getBucketImgUrl(id)}
            />
          </ButtonBase>
        ))}
      </div>
    </div>
  );
};

export default ImageHistory;
