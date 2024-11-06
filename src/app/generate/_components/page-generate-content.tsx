'use client';

import { useRef, useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { useRouter } from 'next/navigation';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import GenerateTextField from '@/app/_components/generate-text-field';
import Typography from '@/app/_components/typography';
import { SpecialPromoCookie } from '@/app/_promo/special-promo-cookie';
import { GENERATION_DATA, MAX_PROMPT_LENGTH } from '@/app/_utils/constants';
import GenerationStylePicker from '@/app/generate/_components/generation-style-picker';
import GenerateInfoLimit from '@/app/generate/_components/generation-token-limit-info';
import { ParsedGenerationTokenCookie } from '@/app/generate/_utils/generation-token';
import { ImageHistoryEntry } from '@/app/generate/_utils/image-history/common';
import ImageHistory from './image-history';

const PageGenerateContent = ({
  initialPrompt,
  generationTokenCountCookie,
  imageHistory,
  initialStyleIndex,
  specialPromoCookie,
}: {
  initialPrompt: string;
  generationTokenCountCookie: ParsedGenerationTokenCookie;
  imageHistory: ImageHistoryEntry[];
  initialStyleIndex: number;
  specialPromoCookie: SpecialPromoCookie;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [styleIndex, setStyleIndex] = useState(initialStyleIndex);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm({ defaultValues: { prompt: initialPrompt } });

  const handleSubmit = ({ prompt }: { prompt: string }) => {
    if (!prompt) {
      inputRef.current?.focus();
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

      return;
    }

    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'generate_image',
        styleIndex: styleIndex,
      });
    }

    startTransition(() => {
      router.replace(`/generate/buy?prompt=${prompt}&styleIndex=${styleIndex}`);
    });
  };

  return (
    <AppContainer className="pb-20 pt-[--save-navbar-padding-top]">
      <AppContainer.Content className="flex flex-col gap-10 overflow-auto text-text lg:gap-20">
        <div className="flex flex-col gap-5 lg:gap-10">
          <div className="flex flex-col gap-2.5 lg:gap-5">
            <h1 className="text-3xl font-bold leading-[120%] tracking-[1px] md:text-4xl lg:text-5xl">
              Stwórz <span className="text-primary">swój</span> obraz<span className="text-primary">.</span>
            </h1>
            <p className="leading-[150%] tracking-[0.5px]">
              Opisz dokładnie, co chcesz zobaczyć - jedynym ograniczeniem jest Twoja wyobraźnia.
            </p>
          </div>
          <Controller
            control={form.control}
            name="prompt"
            render={({ field, fieldState }) => (
              <GenerateTextField
                inputValue={field.value}
                value={field.value}
                TextFieldProps={{
                  inputRef: (event) => {
                    field.ref(event);
                    inputRef.current = event;
                  },
                  error: fieldState.invalid,
                  helperText: fieldState.error?.message,
                }}
                onBlur={field.onBlur}
                onChange={(_, value) => field.onChange(value || '')}
                onInputChange={(_, value) => field.onChange(value)}
              >
                <GenerateInfoLimit generationTokenCountCookie={generationTokenCountCookie} />
              </GenerateTextField>
            )}
            rules={{
              maxLength: {
                value: MAX_PROMPT_LENGTH,
                message: `Maksymalna długość opisu to ${MAX_PROMPT_LENGTH} znaków.`,
              },
            }}
          />
        </div>
        <div className="flex flex-col gap-5 lg:gap-10">
          <Typography.H4>
            Wybrany styl: <span className="text-primary">{GENERATION_DATA[styleIndex][1]}</span>
          </Typography.H4>
          <GenerationStylePicker styleIndex={styleIndex} onStyleIndexChange={setStyleIndex} />
        </div>
        <AppButton
          className="py-3 lg:py-5 lg:text-lg"
          disabled={generationTokenCountCookie.value === 0}
          endIcon={<EastRoundedIcon />}
          loading={isPending}
          size="large"
          variant="contained"
          onClick={form.handleSubmit((values) => handleSubmit(values))}
        >
          Stwórz swój obraz
        </AppButton>
        {imageHistory.length > 0 && (
          <ImageHistory imageHistory={imageHistory} specialPromoCookie={specialPromoCookie} />
        )}
      </AppContainer.Content>
    </AppContainer>
  );
};

export default PageGenerateContent;
