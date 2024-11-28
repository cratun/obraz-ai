'use client';

import { useId, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SwiperCore from 'swiper';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import AppContainer from '@/app/_components/app-container';
import Typography from '@/app/_components/typography';
import AppButton from './app-button';

const reviewsData = [
  ['Chciałam mieć fajny obraz z kotkiem, łatwo udało się go stworzyć, zamówiłam i wyszło super :)', 'Martyna'],
  ['Zdziwiłem się, że to całe AI może wygenerować zdjęcie, które wygląda jak prawdziwe, polecam', 'Szymon'],
  [
    'Zamiast szukać obrazu w internecie, wygenerowałem własny. Format 1m x 1m prezentuje się świetnie, a detale są wyraźne nawet z bliska.',
    'Przemek',
  ],
  [
    'A ja zamówiłem ...zdjęcie nie oddaje wrażenia w pełni ale jak dla mnie bomba, to zderzenie Andromedy i Drogi mlecznej które nastąpi za około 5 mld lat 😉😁',
    'Piotr',
  ],
  [
    'Tworzyłam różne obrazy Marilyn Monroe, ten wyszedł bardzo ciekawie, obraz przyszedł dobrze zabezpieczony, druk bez zarzutów. Coś ładnego jeszcze na pewno zamówię',
    'Joanna',
  ],
  // [
  //   'Zamówiłam mały obraz z abstrakcyjnymi kształtami. Jestem zadowolona z jakości obrazu, jest wyraźny, kolory ładne. Idealnie pasuje do mojego wnętrza! :)',
  //   'Aneta',
  // ],
  [
    'Taki oto obraz dla wnuczki, która uwielbia kotki. Wyszło super! Obraz pasuje do pokoiku, wnuczka zadowolona, ja również. Paczkę dostałam po 5 dniach.',
    'Jagoda',
  ],
  [
    'Za 3 razem wyszedł mi obraz, który był dokładnie tym, co chciałem. Wygląda super, taki trochę minimalistyczny. Fajnie, że są zadrukowane krawędzie. Obraz bez wad, wysoka jakość.',
    'Karol',
  ],
] as const;

const ReviewsSwiper = ({ className }: { className?: ClassNameValue }) => {
  const [isInit, setIsInit] = useState(false);
  const swiperRef = useRef<SwiperCore>();
  const swiperId = useId();

  const onInit = (Swiper: SwiperCore): void => {
    setIsInit(true);
    swiperRef.current = Swiper;
  };

  const paginationId = `swiper-pagination-${swiperId}`;

  return (
    <AppContainer className={twMerge('overflow-hidden bg-primary py-10', className)}>
      <AppContainer.Content className="relative -mx-5 box-content min-w-0 flex-col gap-5 bg-[#2E896C] p-5 text-neutral lg:mx-0 lg:flex-row lg:items-center lg:gap-10 lg:rounded-[40px] lg:p-10">
        <Image
          alt=""
          className="absolute -top-5 right-5 z-10 size-[72px] lg:-left-10 lg:-top-7 lg:size-[110px]"
          height={110}
          src="/home-reviews-swiper/quote.svg"
          width={110}
        />
        <Image
          alt=""
          className="absolute -bottom-5 right-5 z-10 size-[72px] -scale-x-100 lg:-bottom-7 lg:-right-10 lg:size-[110px]"
          height={110}
          src="/home-reviews-swiper/quote.svg"
          width={110}
        />
        <div className="flex w-80 flex-col items-start gap-2.5 lg:w-96 lg:gap-5">
          <Typography.H2>Zobacz co mówią klienci</Typography.H2>
          <Typography.Body>
            Poznaj doświadczenia osób, które dzięki naszej technologii przekształciły najśmielsze pomysły w wysokiej
            jakości obrazy — od unikalnych wizji po niezwykłe kreacje.
          </Typography.Body>
          <AppButton
            className="hidden lg:flex"
            color="neutral"
            href="/generate"
            LinkComponent={Link}
            variant="contained"
          >
            Stwórz swój obraz
          </AppButton>
        </div>
        <div className="flex w-full min-w-0 max-w-full flex-col">
          <Swiper
            grabCursor
            id={swiperId}
            modules={[Pagination]}
            pagination={{ el: `[id="${paginationId}"]`, clickable: true }}
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              600: { slidesPerView: 2 },
            }}
            className={twMerge(
              'mx-0 max-h-[650px] w-full rounded-[20px]',
              isInit ? 'opacity-1' : 'opacity-0',
              'transition-opacity',
            )}
            onInit={onInit}
          >
            {reviewsData.map(([text, reviewer], index) => (
              <SwiperSlide
                key={text}
                className="flex h-auto flex-col overflow-hidden rounded-[20px] border-2 border-[#57C6A3]"
              >
                <div className="relative aspect-square w-full max-w-full">
                  <Image
                    fill
                    alt=""
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 600px) 100vw, 50vw"
                    src={`/home-reviews-swiper/${index}.jpg`}
                  />
                </div>
                <div className="h-[10px] bg-primary" />
                <div className="relative flex grow flex-col justify-between gap-2.5 bg-neutral px-5 pb-5 pt-8">
                  <Image
                    alt=""
                    className="absolute -top-11 left-2 right-5 rounded-full border border-primary"
                    height={64}
                    src="/home-reviews-swiper/quote.svg"
                    width={64}
                  />
                  <p className="text-sm tracking-[0.5px] text-text">{text}</p>
                  <div className="text-lg text-accent">{reviewer}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="flex items-center justify-center py-5 [&_.swiper-pagination-bullet-active]:opacity-100 [&_.swiper-pagination-bullet]:size-4 [&_.swiper-pagination-bullet]:bg-white"
            id={paginationId}
          />
          <AppButton
            className="self-center lg:hidden"
            color="neutral"
            href="/generate"
            LinkComponent={Link}
            size="large"
            variant="contained"
          >
            Stwórz swój obraz
          </AppButton>
        </div>
      </AppContainer.Content>
    </AppContainer>
  );
};

export default ReviewsSwiper;
