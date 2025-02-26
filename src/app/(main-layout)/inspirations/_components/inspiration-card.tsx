import { ButtonBase } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { sizeToPrice } from '@/app/(main-layout)/generate/_utils/common';
import { InspirationStyle, MOCKUP_BUCKET_NAME, styles } from '@/app/(main-layout)/inspirations/utils';
import Typography from '@/app/_components/typography';
import { getBucketImgUrl } from '@/app/_utils/common';

const InspirationCard = ({ id, style, prompt }: { id: string; style: InspirationStyle; prompt: string }) => {
  const cardImageSrc = getBucketImgUrl(id, MOCKUP_BUCKET_NAME, '.jpg');

  return (
    <ButtonBase
      key={id}
      className="flex flex-col gap-2.5 rounded-sm text-left transition-transform duration-200 hover:scale-[1.02]"
      href={`/inspirations/${style}/${id}`}
      LinkComponent={Link}
    >
      <div className={twMerge('aspect-square w-full overflow-hidden rounded-md bg-white')}>
        <div className="inspiration-shadow relative aspect-square overflow-hidden">
          <Image fill unoptimized alt={prompt} className="h-full w-full object-cover" src={cardImageSrc} />
        </div>
      </div>
      <div className="mb-auto mr-auto flex flex-col gap-1">
        <Typography.Body className="text-xs font-bold uppercase text-primary">{styles[style]}</Typography.Body>
        <Typography.Body className="line-clamp-2">{prompt}</Typography.Body>
        <Typography.Body className="text-sm font-semibold text-accent">
          Od {style === 'portrait' ? sizeToPrice.portrait.S : sizeToPrice.square.S} zł
        </Typography.Body>
      </div>
    </ButtonBase>
  );
};

export default InspirationCard;
