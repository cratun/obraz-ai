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
    prompt: 'Epicka flota kosmicznych statków w górach',
    image: 1,
  },
  {
    prompt: 'Abstrakcyjna kompozycja wirujących kolorów i geometrycznych kształtów z dynamicznymi wzorami',
    image: 2,
  },
  {
    prompt: 'Minimalistyczny obraz drzewa na tle prostego gradientowego zachodu słońca z czystymi liniami i górami',
    image: 3,
  },
  {
    prompt: 'Kolorowe miasto z animowanymi postaciami bawiącymi się w parku i zabawnymi zwierzętami na ulicach',
    image: 4,
  },
  {
    prompt: 'Futurystyczne miasto nocą z neonowymi światłami, hologramami i latającymi pojazdami',
    image: 5,
  },
  {
    prompt: 'Steampunkowy minimalistyczny pojazd z lat 20, pod wodą, rekiny, wielka ośmiornica',
    image: 6,
  },
  {
    prompt: 'Głębinowa katedra w podwodnej jaskini łączy gotyk z bioluminescencją i morskimi stworzeniami',
    image: 7,
  },
  {
    prompt: 'Spokojny zachód słońca nad plażą z realistycznymi falami i pomarańczowo-różowymi barwami.',
    image: 8,
  },
];

const repeatedSlides: typeof slides = [];

for (let i = 0; i < 2; i++) {
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

const InteriorSettingPicturesSwiper = () => {
  const [isInit, setIsInit] = useState(false);
  const swiperRef = useRef<SwiperCore>();

  const onInit = (Swiper: SwiperCore): void => {
    setIsInit(true);
    swiperRef.current = Swiper;
  };

  return (
    <div>
      <Swiper
        {...SwiperConfig}
        className={twMerge(isInit ? 'opacity-1' : 'opacity-0', 'transition-opacity')}
        id="home-setting-pictures-swiper"
        onInit={onInit}
      >
        {repeatedSlides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="relative aspect-square h-auto w-full max-w-[600px] overflow-hidden rounded-lg"
          >
            <div className="absolute bottom-0 left-0 right-0 top-0 z-[1] bg-gradient-to-t from-black to-black/0 to-50%"></div>
            <div className="absolute bottom-2.5 left-5 right-5 z-[1] text-xs text-neutral md:text-sm">
              &quot;{slide.prompt}&quot;
            </div>
            <Image fill alt="" className="w-full" src={`/home-setting-pictures-swiper/${slide.image}.png`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InteriorSettingPicturesSwiper;
