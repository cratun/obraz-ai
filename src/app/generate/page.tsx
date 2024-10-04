import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { SerachParams } from '@/app/types';
import PageGenerateContent from './_components/page-generate-content';
import ProductPrice from './_components/product-price';
import { getGenerationTokenCountCookie } from './_utils/generation-token';
import { getImageHistoryFromCookie } from './_utils/image-history/server';

const PageGenerate = ({ searchParams }: { searchParams: SerachParams }) => {
  return (
    <PageGenerateContent
      generationTokenCountCookie={getGenerationTokenCountCookie()}
      imageHistory={getImageHistoryFromCookie()}
      initialPrompt={typeof searchParams.prompt === 'string' ? searchParams.prompt : ''}
      priceElement={
        <Suspense fallback={<CircularProgress size={15} />}>
          <ProductPrice />
        </Suspense>
      }
    />
  );
};

export default PageGenerate;
