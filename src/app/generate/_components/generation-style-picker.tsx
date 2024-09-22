'use client';

import Image from 'next/image';
import { parseAsNumberLiteral, useQueryState } from 'nuqs';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

const styles = [
  ['surprise', 'Zaskocz mnie'],
  ['surrealism', 'Surrealizm'],
  ['hyper-realistic', 'Hiperrealizm'],
  ['cyberpunk', 'Cyberpunk'],
  ['anime', 'Anime'],
  ['impressionism', 'Impresjonizm'],
  ['pop-art', 'Pop-art'],
  ['minimalism', 'Minimalizm'],
  ['cubism', 'Kubizm'],
] as const;

export const useGenerationStylePickerIndex = () => {
  const [styleIndex, setStyleIndex] = useQueryState(
    'styleIndex',
    parseAsNumberLiteral(styles.map((_, index) => index))
      .withDefault(0)
      .withOptions({ history: 'replace' }),
  );

  return { styleIndex, setStyleIndex };
};

const GenerationStylePicker = () => {
  const { styleIndex, setStyleIndex } = useGenerationStylePickerIndex();

  return (
    <div className="w-full">
      <Swiper
        initialSlide={styleIndex}
        slidesPerView={1}
        spaceBetween={20}
        onSlideChange={({ activeIndex }) => setStyleIndex(activeIndex)}
      >
        {styles.map(([style, text], index) => (
          <SwiperSlide key={style} className="flex flex-col gap-2.5">
            <div className="relative aspect-square w-full drop-shadow-md">
              <Image fill alt={style} src={'/styles/' + style + '.webp'} />
            </div>
            <div className="text-center text-xl font-medium leading-[1.5] text-text">
              {index + 1}. {text}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GenerationStylePicker;
