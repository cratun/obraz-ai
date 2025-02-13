'use client';
import { Dispatch, ForwardedRef, forwardRef, SetStateAction, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonBase, Drawer, IconButton, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import Typography from '@/app/_components/typography';
import { getBucketImgUrl } from '@/app/_utils/common';

const TemplateModal = forwardRef(
  (
    {
      setTemplateUrl,
      templateUrl,
    }: {
      setTemplateUrl: Dispatch<SetStateAction<string | null>>;
      templateUrl: string | null;
    },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Drawer
          anchor="right"
          classes={{ paper: 'w-[500px] p-5 gap-5 max-w-[90vw]' }}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div className="flex items-center justify-between gap-2.5">
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
            <Typography.H4 className="pr-5">Kliknij na szablon, który Cię interesuje</Typography.H4>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {Array.from({ length: 28 }).map((_, index) => (
              <Image
                key={index}
                alt=""
                className="w-full cursor-pointer rounded-xl"
                height={400}
                src={getBucketImgUrl((index + 1).toString(), 'public-portrait-templates')}
                width={300}
                onClick={() => {
                  setTemplateUrl(getBucketImgUrl((index + 1).toString(), 'public-portrait-templates'));
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        </Drawer>
        <div ref={ref} className="relative grid grid-cols-2 gap-5 rounded-xl md:grid-cols-4">
          <ButtonBase
            className={twMerge(
              'absolute bottom-0 left-0 right-0 top-0 z-20 flex flex-col items-center justify-center gap-5 rounded-xl bg-black/70 backdrop-blur-sm',
              templateUrl ? 'bg-transparent' : 'bg-black/70',
            )}
            onClick={() => setIsOpen(true)}
          >
            {templateUrl && (
              <Image
                alt=""
                className="max-w-[150px] rounded-xl md:max-w-full"
                height={400}
                src={templateUrl}
                width={300}
              />
            )}
            <div className="rounded-full bg-primary px-5 py-2.5 text-white">
              {templateUrl ? 'Zmień szablon' : 'Wybierz szablon'}
            </div>
          </ButtonBase>
          {Array.from({ length: isMobile ? 2 : 4 }).map((_, index) => (
            <Image
              key={index}
              alt=""
              className={twMerge('w-full rounded-xl', templateUrl ? 'py-10 opacity-0' : '')}
              height={400}
              src={getBucketImgUrl((index + 1).toString(), 'public-portrait-templates')}
              width={300}
            />
          ))}
        </div>
      </>
    );
  },
);

TemplateModal.displayName = 'TemplateModal';
export default TemplateModal;
