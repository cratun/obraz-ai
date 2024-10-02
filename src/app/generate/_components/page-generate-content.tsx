'use client';

import { useRef, useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import { useRouter } from 'next/navigation';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import AppLogo from '@/app/_components/app-logo';
import GenerateTextField from '@/app/_components/generate-text-field';
import { GENERATION_DATA, MAX_PROMPT_LENGTH } from '@/app/_utils/constants';
import GenerationStylePicker from '@/app/generate/_components/generation-style-picker';
import GenerateInfoLimit from '@/app/generate/_components/generation-token-limit-info';
import { ParsedGenerationTokenCookie } from '@/app/generate/_utils/generation-token';

const PageGenerateContent = ({
  initialPrompt,
  generationTokenCountCookie,
}: {
  initialPrompt: string;
  generationTokenCountCookie: ParsedGenerationTokenCookie;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [styleIndex, setStyleIndex] = useState(0);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm({ defaultValues: { prompt: initialPrompt } });

  const handleSubmit = ({ prompt }: { prompt: string }) => {
    if (!prompt) {
      inputRef.current?.focus();
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

      return;
    }

    startTransition(() => {
      router.replace(`/generate/buy?prompt=${prompt}&styleIndex=${styleIndex}`);
    });
  };

  return (
    <AppContainer className="py-5">
      <AppContainer.Content className="flex flex-col gap-10 overflow-auto lg:gap-20">
        <AppLogo className="lg:w-[200px]" />
        <div className="flex flex-col gap-5 lg:gap-10">
          <div className="flex flex-col gap-2.5 lg:gap-5">
            <h1 className="text-5xl font-bold leading-[120%] tracking-[1px]">
              Generuj <br className="lg:hidden" />
              <span className="text-primary">swój</span> obraz<span className="text-primary">.</span>
            </h1>
            <p className="leading-[150%] tracking-[0.5px] text-text">
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
          <div className="flex flex-col text-[30px] font-semibold leading-[1.2] text-text sm:flex-row sm:gap-2.5">
            <h2>Wybrany styl:</h2>
            <span className="text-primary">{GENERATION_DATA[styleIndex][1]}</span>
          </div>
          <GenerationStylePicker styleIndex={styleIndex} onStyleIndexChange={setStyleIndex} />
        </div>
        <AppButton
          className="lg:py-5 lg:text-lg"
          disabled={generationTokenCountCookie.value === 0}
          endIcon={<EastRoundedIcon />}
          loading={isPending}
          size="large"
          variant="contained"
          onClick={form.handleSubmit((values) => handleSubmit(values))}
        >
          Kontynuuj
        </AppButton>
      </AppContainer.Content>
    </AppContainer>
  );
};

export default PageGenerateContent;
