import { SerachParams } from '@/app/types';
import PageGenerateContent from './_components/page-generate-content';
import { getGenerationTokenCountCookie } from './_utils/generation-token';

const PageGenerate = ({ searchParams }: { searchParams: SerachParams }) => {
  return (
    <PageGenerateContent
      generationTokenCountCookie={getGenerationTokenCountCookie()}
      initialPrompt={typeof searchParams.prompt === 'string' ? searchParams.prompt : ''}
    />
  );
};

export default PageGenerate;
