'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import AppButton from './app-button';
import GenerateTextField from './generate-text-field';

const GenerateTextFieldHome = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleGenerate = (userPrompt: string) => {
    startTransition(() => {
      router.push(`/generate?prompt=${userPrompt}`);
    });
  };

  return (
    <GenerateTextField
      inputValue={prompt}
      value={prompt}
      TextFieldProps={{
        slotProps: {
          input: {
            endAdornment: (
              <AppButton loading={isPending} variant="contained" onClick={() => handleGenerate(prompt)}>
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
