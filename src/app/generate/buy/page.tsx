import { redirect } from 'next/navigation';
import { SerachParams } from '@/app/types';
import PageContent from './page-content';

const isStringNotEmptyString = (param: SerachParams[number]): param is string =>
  typeof param === 'string' && param.length > 0 && !Array.isArray(param);

const PageBuy = ({ searchParams }: { searchParams: SerachParams }) => {
  if (!isStringNotEmptyString(searchParams?.prompt) || !isStringNotEmptyString(searchParams?.styleIndex)) {
    redirect('/generate');
  }

  const parsedStyleIndex = parseInt(searchParams.styleIndex, 10);

  return (
    <PageContent
      initialPrompt={searchParams.prompt}
      initialStyleIndex={Number.isNaN(parsedStyleIndex) ? 0 : parsedStyleIndex}
    />
  );
};

export default PageBuy;
