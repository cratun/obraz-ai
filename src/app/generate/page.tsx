import { SerachParams } from '@/app/types';
import PageGenerateContent from './_components/page-generate-content';

const PageGenerate = ({ searchParams }: { searchParams: SerachParams }) => {
  return <PageGenerateContent initialPrompt={typeof searchParams.prompt === 'string' ? searchParams.prompt : ''} />;
};

export default PageGenerate;
