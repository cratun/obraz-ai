import { Metadata } from 'next';
import PageGeneratePortraitContent from '@/app/(main-layout)/generate/_components/page-generate-portrait-content';
import { getGenerationTokenCountCookie } from '@/app/(main-layout)/generate/_utils/generation-token';
import { getImageHistoryFromCookie } from '@/app/(main-layout)/generate/_utils/image-history/server';
import { getSpecialPromoCookie } from '@/app/_promo/special-promo-cookie';

export const metadata: Metadata = {
  title: 'ObrazAI - Generuj Portrety | Ożyw Swoją Wyobraźnię',
  description: 'Rozpocznij generowanie niepowtarzalnych portretów z ObrazAI. Ożyw swoje marzenia na płótnie już dziś!',
};

const PageGeneratePortrait = ({ searchParams }: { searchParams: { template_id?: string } }) => {
  return (
    <PageGeneratePortraitContent
      generationTokenCountCookie={getGenerationTokenCountCookie()}
      imageHistory={getImageHistoryFromCookie()}
      specialPromoCookie={getSpecialPromoCookie()}
      templateId={searchParams.template_id}
    />
  );
};

export default PageGeneratePortrait;
