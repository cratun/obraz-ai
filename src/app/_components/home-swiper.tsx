'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import SwiperCore from 'swiper';
import { Autoplay, Parallax } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { twMerge } from 'tailwind-merge';

const slides = [
  {
    prompt: 'Jezus nad miastem',
    styl: 'realistyczny',
    image: 1,
  },
  {
    prompt: 'Kobieta się patrzy',
    styl: 'realistyczny',
    image: 2,
  },
  {
    prompt: 'Balon nad polem',
    styl: 'abstrakcja',
    image: 3,
  },
];

const repeatedSlides: typeof slides = [];

for (let i = 0; i < 4; i++) {
  repeatedSlides.push(...slides);
}

const SwiperConfig: SwiperProps = {
  speed: 10000,
  autoplay: {
    delay: 5,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  loop: true,
  slidesPerView: 'auto',
  watchSlidesProgress: true,
  spaceBetween: 20,
  grabCursor: true,
};
SwiperCore.use([Autoplay, Parallax]);

const HomeSwiper = () => {
  const [isInit, setIsInit] = useState(false);
  const swiperRef = useRef<SwiperCore>();

  const onInit = (Swiper: SwiperCore): void => {
    setIsInit(true);
    swiperRef.current = Swiper;
  };

  const handleMouseEnter = () => {
    if (swiperRef.current) swiperRef.current.autoplay.start();
  };
  const handleMouseLeave = () => {
    if (swiperRef.current) swiperRef.current.autoplay.stop();
  };

  return (
    <div id="home-swiper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Swiper
        {...SwiperConfig}
        className={twMerge(isInit ? 'opacity-1' : 'opacity-0', 'transition-opacity')}
        onInit={onInit}
      >
        {repeatedSlides.map((slide, index) => (
          <SwiperSlide key={index} className="aspect-square w-auto overflow-hidden rounded-xl">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-t from-black to-black/0 to-50%"></div>
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-b from-black to-black/0 to-50% opacity-60"></div>
            <div className="py-1.25 absolute left-2.5 top-2.5 rounded-full border border-neutral/60 px-2.5 text-sm capitalize text-neutral">
              {slide.styl}
            </div>
            <div className="absolute bottom-2.5 left-2.5 text-neutral">&quot;{slide.prompt}&quot;</div>
            <Image alt="" height={250} quality={100} src={`/swiper/${slide.image}.png`} width={250} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSwiper;
