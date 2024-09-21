'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import AppButton from '@/app/_components/app-button';
import AppLogo from '@/app/_components/app-logo';
import GenerateTextField from '@/app/_components/generate-text-field';
import { useCreationDailyLimit, usePromptState } from '@/app/hooks';
import 'swiper/css';

const styles = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const Slider = () => {
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {styles.map((style) => (
          <SwiperSlide key={style}>
            <div className="grid aspect-square h-auto place-items-center bg-primary">{style}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const PageCreate = () => {
  const [prompt, setPrompt] = usePromptState();
  const { consume, remainingTries } = useCreationDailyLimit();

  // const generateMutation = useMutation({
  //   mutationFn: () => actionGenerate({ prompt: prompt }),
  //   onSuccess: () => {
  //     console.log('consume');
  //     consume();
  //   },
  // });

  // const buyMutation = useMutation({
  //   mutationFn: (metadata: CheckoutMetadata) => actionBuy({ cancelUrl: window.location.href, metadata }),
  // });

  return (
    <div className="flex flex-col gap-10 p-5">
      <AppLogo />
      <div className="flex flex-col gap-5">
        <h1 className="text-[60px] font-bold leading-[1.2] text-text">
          Generuj <br />
          <span className="text-primary">swój</span> obraz<span className="text-primary">.</span>
        </h1>
        <GenerateTextField value={prompt} onChange={(_, value) => setPrompt(value)} />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-[30px] font-semibold leading-[1.2] text-text">Wybierz swój styl</h2>
      </div>
      <Slider />

      <AppButton
        component={Link}
        // @ts-ignore
        href={{ pathname: '/generate/buy', query: { prompt } }}
        replace={true}
        size="large"
        variant="contained"
      >
        Kontynuuj
      </AppButton>
    </div>
    // <div className="flex-start flex flex-col items-start gap-10">
    //   <h1>Create new image</h1>
    //   <TextField onChange={(event) => setPrompt(event.target.value)} />
    //   <AppButton disabled={!prompt} onClick={() => generateMutation.mutate()}>
    //     Generate
    //   </AppButton>
    //   {generateMutation.isError && <div>Error: {generateMutation.error.message}</div>}
    //   {generateMutation.isPending && <div>Pending...</div>}
    //   {generateMutation.isSuccess && (
    //     <div className="flex flex-wrap gap-10">
    //       {generateMutation.data.images.map((src) => (
    //         <Image key={src} alt="" className="object-contain" height={400} src={src} width={600} />
    //       ))}
    //     </div>
    //   )}
    //   <AppButton
    //     disabled={!generateMutation.isSuccess}
    //     size="large"
    //     onClick={() => buyMutation.mutate(ensureNotNull(generateMutation.data).metadata)}
    //   >
    //     Buy 200 zł
    //   </AppButton>
    //   <div>Remaining tries: {remainingTries}</div>
    // </div>
  );
};

export default PageCreate;
