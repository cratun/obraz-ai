'use client';
import { Dispatch, ForwardedRef, forwardRef, SetStateAction, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { ButtonBase, Drawer, IconButton, useMediaQuery } from '@mui/material';
import Tab from '@mui/material/Tab';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { TEMPLATE_BUCKET_NAME } from '@/app/(main-layout)/generate/_utils/common';
import Typography from '@/app/_components/typography';
import { getBucketImgUrl } from '@/app/_utils/common';

const CATEGORY_NAMES = {
  man: 'Mężczyzna',
  woman: 'Kobieta',
  kid: 'Dziecko',
};

type Category = keyof typeof CATEGORY_NAMES;

const getTemplatesWithCategory = (length: number, category: Category) => {
  const templateUrls = Array.from({ length }, (_, index) =>
    getBucketImgUrl(`${category}-${index + 1}`, TEMPLATE_BUCKET_NAME),
  );

  return {
    [category]: templateUrls,
  };
};

const ALL_TEMPLATES = {
  ...getTemplatesWithCategory(20, 'man'),
  ...getTemplatesWithCategory(20, 'woman'),
  ...getTemplatesWithCategory(20, 'kid'),
};
const ALL_TEMPLATES_ARRAY = Object.values(ALL_TEMPLATES).flat();

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
    const [tab, setTab] = useState<Category>('woman');
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [isOpen, setIsOpen] = useState(false);

    const filteredTemplates = tab ? ALL_TEMPLATES[tab] : ALL_TEMPLATES_ARRAY;

    const handleChange = (_: unknown, newValue: Category) => {
      setTab(newValue);
    };

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
          <TabContext value={tab}>
            <TabList variant="fullWidth" onChange={handleChange}>
              <Tab
                className="text-base normal-case leading-[1.5] tracking-[0.5px]"
                label={CATEGORY_NAMES.woman}
                value="woman"
              />
              <Tab
                className="text-base normal-case leading-[1.5] tracking-[0.5px]"
                label={CATEGORY_NAMES.man}
                value="man"
              />
              <Tab
                className="text-base normal-case leading-[1.5] tracking-[0.5px]"
                label={CATEGORY_NAMES.kid}
                value="kid"
              />
            </TabList>
          </TabContext>
          <div className="grid grid-cols-2 gap-5">
            {filteredTemplates.map((url) => (
              <Image
                key={url}
                alt=""
                className="w-full cursor-pointer rounded-xl"
                height={400}
                src={url}
                width={300}
                onClick={() => {
                  setTemplateUrl(url);
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
              src={getBucketImgUrl((index + 1).toString(), TEMPLATE_BUCKET_NAME)}
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
