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
    prompt: 'Bohater o wyrazistych oczach, kwitnące wiśnie, tradycyjna japońska architektura.',
    style: 'Anime',
    image: 'anime',
  },
  {
    prompt: 'Miasto z nakładającymi się kształtami geometrycznymi, wiele perspektyw.',
    style: 'Kubizm',
    image: 'cubism',
  },
  {
    prompt: 'Nocne miasto z neonami, drapacze chmur, holograficzne reklamy, futurystyczni mieszkańcy.',
    style: 'Cyberpunk',
    image: 'cyberpunk',
  },
  {
    prompt: 'Detaliczne zbliżenie liścia z kroplami rosy, niezwykła wyrazistość.',
    style: 'Hiperrealizm',
    image: 'hyper-realizm',
  },
  {
    prompt: 'Wschód słońca nad kwitnącą łąką, miękkie pociągnięcia pędzla, gra światła.',
    style: 'Impresjonizm',
    image: 'impressionism',
  },
  {
    prompt: 'Proste kształty geometryczne, czyste linie, monochromatyczna paleta.',
    style: 'Minimalizm',
    image: 'minimalism',
  },
  {
    prompt: 'Żywe symbole kultury i celebryci w jaskrawych, kontrastujących kolorach.',
    style: 'Pop Art',
    image: 'pop-art',
  },
  {
    prompt: 'Lewitujące wyspy nad morzem chmur, fantazja spotyka rzeczywistość.',
    style: 'Surrealizm',
    image: 'surrealism',
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

const GeneratedExamplesSwiper = () => {
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
              {slide.style}
            </div>
            <div className="absolute bottom-2.5 left-2.5 right-2.5 text-xs text-neutral">
              &quot;{slide.prompt}&quot;
            </div>
            <Image alt="" height={250} src={`/swiper/${slide.image}.webp`} width={250} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GeneratedExamplesSwiper;
