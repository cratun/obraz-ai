'use client';

import { useState } from 'react';
import { TextField } from '@mui/material';
import AppLogo from '@/app/_components/app-logo';
import { useCreationDailyLimit } from '@/app/hooks';

const PageCreate = () => {
  const [prompt, setPrompt] = useState('');
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
          Generuj <span className="text-primary">swój</span> obraz<span className="text-primary">.</span>
        </h1>
        <TextField />
      </div>
      <div>
        
      </div>
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
