'use client';

import { useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CircularProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import AppButton from '@/app/_components/app-button';
import AppLogo from '@/app/_components/app-logo';
import GenerateTextField from '@/app/_components/generate-text-field';
import GenerationStylePicker, {
  useGenerationStylePickerIndex,
} from '@/app/generate/_components/generation-style-picker';
import actionBuy from '@/app/generate/action-buy';
import actionGenerate from '@/app/generate/action-generate';
import { useGenerationDailyLimit, usePromptState } from '@/app/hooks';
import { CheckoutMetadata } from '@/app/types';

const BuyContent = () => {
  const [prompt, setPrompt] = usePromptState();
  const { styleIndex } = useGenerationStylePickerIndex();
  const { consume } = useGenerationDailyLimit();

  const generateMutation = useMutation({
    mutationFn: () => actionGenerate({ prompt, styleIndex }),
    onSuccess: () => consume(),
  });

  useEffect(() => {
    generateMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buyMutation = useMutation({
    mutationFn: (metadata: CheckoutMetadata) => actionBuy({ cancelUrl: window.location.origin + '/', metadata }),
  });

  return (
    <div className="flex flex-col gap-10 p-5">
      <AppLogo />
      <div className="flex flex-col gap-5">
        <h2 className="text-[30px] font-semibold leading-[1.2] text-text">Twój prompt</h2>
        <GenerateTextField
          inputValue={prompt}
          value={prompt}
          onChange={(_, value) => setPrompt(value)}
          onGenerate={() => generateMutation.mutate()}
          onInputChange={(_, value) => setPrompt(value)}
        />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-[30px] font-semibold leading-[1.2] text-text">Wybierz swój styl</h2>
      </div>
      <GenerationStylePicker />
      {generateMutation.isPending && (
        <div className="relative z-[0] aspect-square w-full p-5">
          <div className="absolute inset-0 z-[0] animate-pulse rounded-xl bg-primary/30"></div>
          <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-5">
            <CircularProgress />
            <div className="text-sm text-text">Tworzenie obrazu...</div>
          </div>
        </div>
      )}
      {generateMutation.isSuccess && (
        <div className="relative aspect-square w-full">
          <Image alt="Generated image" layout="fill" src={generateMutation.data.imgSrc} />
        </div>
      )}
      <div className="flex flex-col gap-2.5">
        <AppButton
          color="accent"
          loading={buyMutation.isPending || generateMutation.isPending}
          size="large"
          startIcon={<ShoppingCartIcon />}
          variant="contained"
          onClick={() => buyMutation.mutate(generateMutation.data?.metadata as CheckoutMetadata)}
        >
          Kup i zapłać
        </AppButton>
        <div className="text-lg text-text">
          Cena: <span className="font-semibold">199.99 zł</span>
        </div>
      </div>
      <div className="flex flex-col gap-5 text-text">
        <div className="text-2xl font-semibold">Szczegóły zamówienia</div>
        <div>obraz o wymiarach 50x50, wydrukowane płótnie, coś tam jakieś szczegóły jeszcze</div>
      </div>
    </div>
  );
};

export default BuyContent;
