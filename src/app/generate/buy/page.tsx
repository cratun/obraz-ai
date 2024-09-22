import { redirect } from 'next/navigation';
import { SerachParams } from '@/app/types';
import BuyContent from './buy-content';

const PageBuy = ({ searchParams }: { searchParams: SerachParams }) => {
  if (!searchParams.prompt) {
    redirect('/generate');
  }

  return <BuyContent />;
};

export default PageBuy;
