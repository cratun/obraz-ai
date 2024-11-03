import { redirect } from 'next/navigation';
import { getSpecialPromoCookie } from '@/app/_promo/special-promo-cookie';
import { getImageHistoryFromCookie } from '@/app/generate/_utils/image-history/server';
import { SerachParams } from '@/app/types';
import PageBuyContent from './page-buy-content';

const isStringNotEmptyString = (param: SerachParams[number]): param is string =>
  typeof param === 'string' && param.length > 0 && !Array.isArray(param);

const PageBuy = ({ searchParams }: { searchParams: SerachParams }) => {
  if (!isStringNotEmptyString(searchParams?.prompt) || !isStringNotEmptyString(searchParams?.styleIndex)) {
    redirect('/generate');
  }

  const parsedStyleIndex = parseInt(searchParams.styleIndex, 10);

  return (
    <PageBuyContent
      imageHistory={getImageHistoryFromCookie()}
      initialPrompt={searchParams.prompt}
      initialStyleIndex={Number.isNaN(parsedStyleIndex) ? 0 : parsedStyleIndex}
      specialPromoCookie={getSpecialPromoCookie()}
    />
  );
};

export default PageBuy;
