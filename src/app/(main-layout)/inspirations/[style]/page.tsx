import InspirationsContent from '@/app/(main-layout)/inspirations/_components/inspirations-content';
import { styles } from '@/app/(main-layout)/inspirations/utils';
import { GenerationStyle } from '@/app/_utils/constants';

export async function generateMetadata({ params }: { params: { style: GenerationStyle } }) {
  return {
    title: `ObrazAI - ${styles[params.style]} - Stwórz Obraz w Stylu ${styles[params.style]}`,
    description: `Poznaj inspirujące obrazy w stylu ${styles[params.style]} na ObrazAI. Generuj, personalizuj i zamawiaj wyjątkowe dzieła sztuki AI na płótnie, idealne dla miłośników {Style}.`,
  };
}

const InspirationsStylePage = ({ params }: { params: { style: GenerationStyle } }) => {
  return <InspirationsContent style={params.style} />;
};

export default InspirationsStylePage;

export async function generateStaticParams() {
  return Object.keys(styles).map((style) => ({ style: style }));
}
