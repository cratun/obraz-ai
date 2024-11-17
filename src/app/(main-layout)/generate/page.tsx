import { getSpecialPromoCookie } from '@/app/_promo/special-promo-cookie';
import { getIsGenerationStyle } from '@/app/_utils/constants';
import { SerachParams } from '@/app/types';
import PageGenerateContent from './_components/page-generate-content';
import { getGenerationTokenCountCookie } from './_utils/generation-token';
import { getImageHistoryFromCookie } from './_utils/image-history/server';

const PageGenerate = ({ searchParams }: { searchParams: SerachParams }) => {
  return (
    <PageGenerateContent
      generationTokenCountCookie={getGenerationTokenCountCookie()}
      imageHistory={getImageHistoryFromCookie()}
      initialPrompt={typeof searchParams.prompt === 'string' ? searchParams.prompt : ''}
      specialPromoCookie={getSpecialPromoCookie()}
      initialGenerationStyle={
        getIsGenerationStyle(searchParams.generationStyle) ? searchParams.generationStyle : 'adjusted'
      }
    />
  );
};

export default PageGenerate;
