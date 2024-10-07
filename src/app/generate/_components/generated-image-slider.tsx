import { useId, useRef, useState } from 'react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { twJoin, twMerge } from 'tailwind-merge';

const GeneratedImageSlider = ({
  mockupImages,
  generatedImgSrc,
  className,
}: {
  className?: string;
  mockupImages: string[];
  generatedImgSrc: string;
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const swiperId = useId();
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const getPaginationId = () => `swiper-pagination-${swiperId}`;

  return (
    <div className={twMerge('flex w-full max-w-[600px] flex-col gap-2.5', className)}>
      <Swiper
        className="mx-0 w-full select-none"
        id={swiperId}
        modules={[Pagination]}
        pagination={{ el: `[id="${getPaginationId()}"]` }}
        slidesPerView={1}
        onInit={() => setIsInitialized(true)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={() => {
          if (!swiperRef.current) return;
          setActiveSlideIndex(swiperRef.current.activeIndex);
        }}
      >
        <SwiperSlide className="w-full max-w-full lg:max-w-[600px]">
          <div className="relative aspect-square w-full">
            <Image alt="Generated image" layout="fill" src={generatedImgSrc} />
          </div>
        </SwiperSlide>
        {mockupImages.map((image) => (
          <SwiperSlide key={image} className="w-full max-w-full lg:max-w-[600px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Mockup Image aspect-square" src={image} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={twJoin('flex justify-between', isInitialized && mockupImages.length > 0 ? 'visible' : 'invisible')}
      >
        <IconButton
          className="hidden text-[--swiper-theme-color] lg:inline-flex [&.Mui-disabled]:opacity-40"
          color="inherit"
          disabled={activeSlideIndex === 0}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ChevronLeftRoundedIcon />
        </IconButton>
        <div
          className="static flex items-center justify-center gap-1 [&_.swiper-pagination-bullet-active]:opacity-100 [&_.swiper-pagination-bullet]:bg-[--swiper-theme-color]"
          id={getPaginationId()}
        />
        <IconButton
          className="hidden text-[--swiper-theme-color] lg:inline-flex [&.Mui-disabled]:opacity-40"
          color="inherit"
          disabled={activeSlideIndex === mockupImages.length}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ChevronRightRoundedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default GeneratedImageSlider;
