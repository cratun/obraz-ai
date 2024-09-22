'use client';

import Link from 'next/link';
import AppButton from '@/app/_components/app-button';
import AppLogo from '@/app/_components/app-logo';
import GenerateTextField from '@/app/_components/generate-text-field';
import GenerationStylePicker, {
  useGenerationStylePickerIndex,
} from '@/app/generate/_components/generation-style-picker';
import { usePromptState } from '@/app/hooks';

const PageCreate = () => {
  const [prompt, setPrompt] = usePromptState();
  const { styleIndex } = useGenerationStylePickerIndex();

  return (
    <div className="flex flex-col gap-10 p-5">
      <AppLogo />
      <div className="flex flex-col gap-5">
        <h1 className="text-[60px] font-bold leading-[1.2] text-text">
          Generuj <br />
          <span className="text-primary">swój</span> obraz<span className="text-primary">.</span>
        </h1>
        <GenerateTextField
          inputValue={prompt}
          value={prompt}
          onChange={(_, value) => setPrompt(value)}
          onInputChange={(_, value) => setPrompt(value)}
        />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-[30px] font-semibold leading-[1.2] text-text">Wybierz swój styl</h2>
      </div>
      <GenerationStylePicker />
      <AppButton
        component={Link}
        disabled={!prompt}
        // @ts-ignore
        href={{ pathname: '/generate/buy', query: { prompt, styleIndex } }}
        replace={true}
        size="large"
        variant="contained"
      >
        Kontynuuj
      </AppButton>
    </div>
  );
};

export default PageCreate;
