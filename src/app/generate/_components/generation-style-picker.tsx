'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { GENERATION_STYLES } from '@/app/_utils/constants';

const GenerationStylePicker = ({
  styleIndex,
  imgClassName,
  onStyleIndexChange,
}: {
  styleIndex: number;
  imgClassName?: string;
  onStyleIndexChange: (styleIndex: number) => void;
}) => {
  return (
    <div className="custom-scrollbar flex grow gap-2.5 overflow-x-auto pb-2 lg:grid lg:grid-flow-col lg:grid-rows-2 lg:pb-0">
      {GENERATION_STYLES.map(([style, text], index) => (
        <div
          key={style}
          className={twMerge(
            'relative flex cursor-pointer flex-col items-center gap-2.5 rounded-lg border-[3px] border-transparent p-2.5',
            styleIndex === index && 'border-primary',
          )}
          onClick={() => onStyleIndexChange(index)}
        >
          <div className={twMerge('relative aspect-square w-28 drop-shadow-lg lg:w-40', imgClassName)}>
            <Image fill alt={style} src={'/styles/' + style + '.webp'} />
          </div>
          <div className="text-center leading-normal text-text">{text}</div>
        </div>
      ))}
    </div>
  );
};

export default GenerationStylePicker;
