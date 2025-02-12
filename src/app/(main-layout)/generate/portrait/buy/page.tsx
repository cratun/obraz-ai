import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getImageHistoryFromCookie } from '@/app/(main-layout)/generate/_utils/image-history/server';

import { getSpecialPromoCookie } from '@/app/_promo/special-promo-cookie';
import { SerachParams } from '@/app/types';
import PageBuyContentPortrait from './page-buy-portrait-content';

export const metadata: Metadata = {
  title: 'ObrazAI - Zamów Swój Portret | Finalizuj Zakup',
  description:
    'Gotowy na zamówienie swojego unikalnego portretu? Finalizuj zakup w ObrazAI i ciesz się sztuką stworzoną z Twojej wyobraźni!',
};

const isStringNotEmptyString = (param: SerachParams[number]): param is string =>
  typeof param === 'string' && param.length > 0 && !Array.isArray(param);

const PageBuyPortrait = ({ searchParams }: { searchParams: SerachParams }) => {
  if (!isStringNotEmptyString(searchParams?.image) || !isStringNotEmptyString(searchParams?.template)) {
    redirect('/generate/portrait');
  }

  return (
    <PageBuyContentPortrait
      image={searchParams.image}
      imageHistory={getImageHistoryFromCookie()}
      specialPromoCookie={getSpecialPromoCookie()}
      template={searchParams.template}
    />
  );
};

export default PageBuyPortrait;
