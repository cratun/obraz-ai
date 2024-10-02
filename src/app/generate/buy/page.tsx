import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { redirect } from 'next/navigation';
import { getGenerationTokenCountCookie } from '@/app/generate/_utils/generation-token';
import { SerachParams } from '@/app/types';
import PageBuyContent from './page-buy-content';
import PageBuyPrice from './page-buy-price';

const isStringNotEmptyString = (param: SerachParams[number]): param is string =>
  typeof param === 'string' && param.length > 0 && !Array.isArray(param);

const PageBuy = ({ searchParams }: { searchParams: SerachParams }) => {
  if (!isStringNotEmptyString(searchParams?.prompt) || !isStringNotEmptyString(searchParams?.styleIndex)) {
    redirect('/generate');
  }

  const parsedStyleIndex = parseInt(searchParams.styleIndex, 10);

  return (
    <PageBuyContent
      generationTokenCountCookie={getGenerationTokenCountCookie()}
      initialPrompt={searchParams.prompt}
      initialStyleIndex={Number.isNaN(parsedStyleIndex) ? 0 : parsedStyleIndex}
      priceElement={
        <Suspense fallback={<CircularProgress size={15} />}>
          <PageBuyPrice />
        </Suspense>
      }
    />
  );
};

export default PageBuy;
