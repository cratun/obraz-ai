'use client';

import AppLogo from '@/app/_components/app-logo';
import GenerateTextField from '@/app/_components/generate-text-field';
import GenerationStylePicker from '@/app/generate/_components/generation-style-picker';
import { usePromptState } from '@/app/hooks';

const PageCreate = () => {
  const [prompt, setPrompt] = usePromptState();
  // const [styleSliderIndex] = useGenerationStylePickerIndex();
  // const { consume, remainingTries } = useGenerationDailyLimit();

  return (
    <div className="flex flex-col gap-10 p-5">
      <AppLogo />
      <div className="flex flex-col gap-5">
        <h2 className="text-[30px] font-semibold leading-[1.2] text-text">Twój prompt</h2>
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
    </div>
  );
};

export default PageCreate;
