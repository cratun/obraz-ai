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
      initialStyleIndex={typeof searchParams.styleIndex === 'string' ? parseInt(searchParams.styleIndex, 10) : 0}
    />
  );
};

export default PageGenerate;
