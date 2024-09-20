'use client';

import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useCreationDailyLimit } from '@/app/hooks';
import { CheckoutMetadata } from '@/app/types';
import { ensureNotNull } from '@/app/utils';
import actionBuy from './action-buy';
import actionGenerate from './action-generate';

const PageCreate = () => {
  const [prompt, setPrompt] = useState('');
  const { consume, remainingTries } = useCreationDailyLimit();

  const generateMutation = useMutation({
    mutationFn: () => actionGenerate({ prompt: prompt }),
    onSuccess: () => {
      console.log('consume');
      consume();
    },
  });

  const buyMutation = useMutation({
    mutationFn: (metadata: CheckoutMetadata) => actionBuy({ cancelUrl: window.location.href, metadata }),
  });

  return (
    <div className="flex-start flex flex-col items-start gap-10">
      <h1>Create new image</h1>
      <TextField onChange={(event) => setPrompt(event.target.value)} />
      <Button disabled={!prompt} onClick={() => generateMutation.mutate()}>
        Generate
      </Button>
      {generateMutation.isError && <div>Error: {generateMutation.error.message}</div>}
      {generateMutation.isPending && <div>Pending...</div>}
      {generateMutation.isSuccess && (
        <div className="flex flex-wrap gap-10">
          {generateMutation.data.images.map((src) => (
            <Image key={src} alt="" className="object-contain" height={400} src={src} width={600} />
          ))}
        </div>
      )}
      <Button
        disabled={!generateMutation.isSuccess}
        size="large"
        onClick={() => buyMutation.mutate(ensureNotNull(generateMutation.data).metadata)}
      >
        Buy 200 zł
      </Button>
      <div>Remaining tries: {remainingTries}</div>
    </div>
  );
};

export default PageCreate;
