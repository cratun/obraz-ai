'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppButton from './app-button';
import GenerateTextField from './generate-text-field';

const GenerateTextFieldHome = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');

  const handleGenerate = (userPrompt: string) => {
    router.push(`/generate?prompt=${userPrompt}`);
  };

  return (
    <GenerateTextField
      inputValue={prompt}
      value={prompt}
      TextFieldProps={{
        slotProps: {
          input: {
            endAdornment: (
              <AppButton variant="contained" onClick={() => handleGenerate(prompt)}>
                Generuj
              </AppButton>
            ),
          },
        },
      }}
      onChange={(_, value) => setPrompt(value || '')}
      onInputChange={(_, value) => setPrompt(value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleGenerate(prompt);
        }
      }}
    />
  );
};

export default GenerateTextFieldHome;
