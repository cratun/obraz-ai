'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { GENERATION_DATA, GenerationStyle } from '@/app/_utils/constants';

const GenerationStylePicker = ({
  generationStyle,
  imgClassName,
  onGenerationStyleChange,
}: {
  generationStyle: GenerationStyle;
  imgClassName?: string;
  onGenerationStyleChange: (generationStyle: GenerationStyle) => void;
}) => {
  return (
    <div className="custom-scrollbar flex grow gap-2.5 overflow-x-auto pb-2 lg:grid lg:grid-flow-col lg:grid-rows-2 lg:pb-0">
      {GENERATION_DATA.map(({ generationStyle: style, text }) => (
        <div
          key={style}
          className={twMerge(
            'relative flex cursor-pointer flex-col items-center gap-2.5 rounded-lg border-[3px] border-transparent p-2.5',
            generationStyle === style && 'border-primary',
          )}
          onClick={() => onGenerationStyleChange(style)}
        >
          <div className={twMerge('relative aspect-square w-24 drop-shadow-lg', imgClassName)}>
            <Image fill alt={style} sizes="160px" src={'/styles/' + style + '.webp'} />
          </div>
          <div className="text-center leading-normal text-text">{text}</div>
        </div>
      ))}
    </div>
  );
};

export default GenerationStylePicker;
