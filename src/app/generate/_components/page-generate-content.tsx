'use client';

import { useState } from 'react';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import Link from 'next/link';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import AppLogo from '@/app/_components/app-logo';
import GenerateInfoLimit from '@/app/_components/generate-limit-info';
import GenerateTextField from '@/app/_components/generate-text-field';
import { GENERATION_STYLES } from '@/app/_utils/constants';
import GenerationStylePicker from '@/app/generate/_components/generation-style-picker';

const PageGenerateContent = ({ initialPrompt }: { initialPrompt: string }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [styleIndex, setStyleIndex] = useState(0);

  return (
    <AppContainer className="py-5">
      <AppContainer.Content className="flex flex-col gap-10 overflow-auto lg:gap-20">
        <AppLogo className="lg:w-[200px]" />
        <div className="flex flex-col gap-5 lg:gap-10">
          <h1 className="text-5xl font-bold leading-[120%] tracking-[1px]">
            Generuj <br className="lg:hidden" />
            <span className="text-primary">swój</span> obraz<span className="text-primary">.</span>
          </h1>
          <GenerateTextField
            inputValue={prompt}
            value={prompt}
            onChange={(_, value) => setPrompt(value || '')}
            onInputChange={(_, value) => setPrompt(value)}
          >
            <GenerateInfoLimit />
          </GenerateTextField>
        </div>
        <div className="flex flex-col gap-5 lg:gap-10">
          <div className="flex flex-col text-[30px] font-semibold leading-[1.2] text-text sm:flex-row sm:gap-2.5">
            <h2>Wybrany styl:</h2>
            <span className="text-primary">{GENERATION_STYLES[styleIndex][1]}</span>
          </div>
          <GenerationStylePicker styleIndex={styleIndex} onStyleIndexChange={setStyleIndex} />
        </div>
        <AppButton
          className="lg:py-5 lg:text-lg"
          component={Link}
          disabled={!prompt}
          endIcon={<EastRoundedIcon />}
          // @ts-ignore
          href={{ pathname: '/generate/buy', query: { prompt, styleIndex } }}
          replace={true}
          size="large"
          variant="contained"
        >
          Kontynuuj
        </AppButton>
      </AppContainer.Content>
    </AppContainer>
  );
};

export default PageGenerateContent;
