import { redirect } from 'next/navigation';
import { getSpecialPromoCookie } from '@/app/_promo/special-promo-cookie';
import { getIsGenerationStyle } from '@/app/_utils/constants';
import { getImageHistoryFromCookie } from '@/app/generate/_utils/image-history/server';
import { SerachParams } from '@/app/types';
import PageBuyContent from './page-buy-content';

const isStringNotEmptyString = (param: SerachParams[number]): param is string =>
  typeof param === 'string' && param.length > 0 && !Array.isArray(param);

const PageBuy = ({ searchParams }: { searchParams: SerachParams }) => {
  if (!isStringNotEmptyString(searchParams?.prompt) || !isStringNotEmptyString(searchParams?.generationStyle)) {
    redirect('/generate');
  }

  return (
    <PageBuyContent
      imageHistory={getImageHistoryFromCookie()}
      initialPrompt={searchParams.prompt}
      specialPromoCookie={getSpecialPromoCookie()}
      initialGenerationStyle={
        getIsGenerationStyle(searchParams.generationStyle) ? searchParams.generationStyle : 'adjusted'
      }
    />
  );
};

export default PageBuy;
