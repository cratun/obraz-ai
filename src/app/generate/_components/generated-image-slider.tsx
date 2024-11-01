import { useId, useRef, useState } from 'react';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { twJoin, twMerge } from 'tailwind-merge';
import { defaultCanvasSize } from '@/app/generate/_utils/sizes-utils';
import { MockupImages } from '@/app/types';

const GeneratedImageSlider = ({
  mockupImages,
  generatedImgSrc,
  className,
}: {
  className?: string;
  mockupImages: MockupImages | null;
  generatedImgSrc: string;
}) => {
  const [isLoadedImage, setIsLoadedImage] = useState(false);
  const size = useSearchParams().get('size') || defaultCanvasSize;
  const swiperId = useId();
  const swiperRef = useRef<SwiperClass | null>(null);
  const filteredMockupImages = mockupImages ? mockupImages[size] || [] : null;

  const paginationId = `swiper-pagination-${swiperId}`;

  return (
    <div className={twMerge('flex w-full max-w-[700px] shrink-0 flex-col gap-2.5', className)}>
      <Swiper
        className="mx-0 w-full select-none"
        id={swiperId}
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{
          el: `[id="${paginationId}"]`,
          clickable: true,
          renderBullet: function (index, className) {
            return filteredMockupImages
              ? `<img class="${className} w-14 h-14 md:w-20 md:h-20 rounded-xl border-2 border-solid border-transparent" src="${index === 0 || index === 4 ? generatedImgSrc : filteredMockupImages[index - 1]}" style="${index === 0 ? 'padding: 12px; background-color:white;' : 'background-color:transparent;'}"/>`
              : '';
          },
          bulletActiveClass: '!border-primary opacity-100',
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        <SwiperSlide
          className={twJoin('w-full max-w-full bg-white lg:max-w-[700px]', isLoadedImage ? 'p-[20%]' : 'p-0')}
        >
          <div className="relative z-[1] aspect-square w-full">
            {/* NOTE: disable easy image copying */}
            <div className="absolute inset-0 z-[1]" />
            <Image
              fill
              unoptimized
              alt="Generated image"
              quality={100}
              sizes="700px"
              src={generatedImgSrc}
              className={twJoin(
                'z-0 shadow-[2px_2px_5px_1px_rgba(0,0,0,0.75)] transition-opacity',
                isLoadedImage ? 'opacity-100' : 'opacity-0',
              )}
              onLoad={() => setIsLoadedImage(true)}
            />
            {!isLoadedImage && (
              <div className="relative z-[0] h-full w-full p-5">
                <div className="absolute inset-0 z-[0] animate-pulse bg-primary/30"></div>
                <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-5">
                  <CircularProgress />
                  <span className="text-sm">Tworzenie obrazu...</span>
                </div>
              </div>
            )}
          </div>
        </SwiperSlide>
        {Array.isArray(filteredMockupImages) &&
          filteredMockupImages.map((image) => (
            <SwiperSlide key={image} className="relative w-full max-w-full lg:max-w-[700px]">
              <div className="absolute inset-0 z-[1]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Mockup Image" className="aspect-square" src={image} />
            </SwiperSlide>
          ))}
        <SwiperSlide className="w-full max-w-full bg-white lg:max-w-[700px]">
          <div className="relative z-[1] aspect-square w-full">
            {/* NOTE: disable easy image copying */}
            <div className="absolute inset-0 z-[1]" />
            <Image fill unoptimized alt="Generated image" quality={100} sizes="700px" src={generatedImgSrc} />
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="flex justify-between">
        {filteredMockupImages && (
          <div
            className="static flex items-center justify-center gap-1 [&_.swiper-pagination-bullet-active]:opacity-100 [&_.swiper-pagination-bullet]:bg-[--swiper-theme-color]"
            id={paginationId}
          />
        )}
        {!filteredMockupImages && (
          <div className="static flex w-full items-center justify-center gap-3">
            <Image
              unoptimized
              alt=""
              className="h-14 w-14 rounded-xl border-2 border-solid border-primary bg-white p-4 md:h-20 md:w-20"
              height={80}
              src={generatedImgSrc}
              width={80}
            />
            {Array.from(Array(4).keys()).map((i) => (
              <span
                key={i}
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-text opacity-75 md:h-20 md:w-20"
              >
                <CircularProgress size={20} />
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratedImageSlider;
