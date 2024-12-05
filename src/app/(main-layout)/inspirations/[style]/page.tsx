import InspirationsContent from '@/app/(main-layout)/inspirations/_components/inspirations-content';
import { styles } from '@/app/(main-layout)/inspirations/utils';
import { GenerationStyle } from '@/app/_utils/constants';

const InspirationsStylePage = ({ params }: { params: { style: GenerationStyle } }) => {
  return <InspirationsContent style={params.style} />;
};

export default InspirationsStylePage;

export async function generateStaticParams() {
  return Object.keys(styles).map((style) => ({ style: style }));
}
