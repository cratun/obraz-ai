import InspirationsContent from '@/app/(main-layout)/inspirations/_components/inspirations-content';
import { InspirationStyle, styles } from '@/app/(main-layout)/inspirations/utils';

const InspirationsStylePage = ({ params }: { params: { style: InspirationStyle } }) => {
  return <InspirationsContent style={params.style} />;
};

export default InspirationsStylePage;

export async function generateStaticParams() {
  return Object.keys(styles).map((style) => ({ style: style }));
}
