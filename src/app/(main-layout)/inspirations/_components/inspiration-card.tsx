import { ButtonBase } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { styles } from '@/app/(main-layout)/inspirations/utils';
import Typography from '@/app/_components/typography';
import { GenerationStyle } from '@/app/_utils/constants';

const InspirationCard = ({ id, style, prompt }: { id: string; style: GenerationStyle; prompt: string }) => {
  return (
    <ButtonBase
      key={id}
      className="flex flex-col gap-2.5 rounded-sm text-left"
      href={`/inspirations/${style}/${id}`}
      LinkComponent={Link}
    >
      <div className="aspect-square w-full bg-white p-[12%]">
        <div className="inspiration-shadow relative aspect-square overflow-hidden">
          <Image
            fill
            alt={prompt}
            className="h-full w-full object-cover"
            src={`/inspirations/${style}/${id}${style === 'impressionism' ? '.webp' : '.jpg'}`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Typography.Body className="text-xs font-bold uppercase text-primary">{styles[style]}</Typography.Body>
        <Typography.Body className="line-clamp-2">{prompt}</Typography.Body>
        <Typography.Body className="text-sm font-semibold text-accent">Od 89 zł</Typography.Body>
      </div>
    </ButtonBase>
  );
};

export default InspirationCard;
