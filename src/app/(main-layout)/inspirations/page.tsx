import { Metadata } from 'next';
import InspirationsContent from './_components/inspirations-content';

export const metadata: Metadata = {
  title: 'ObrazAI - Inspiracje - Znajdź idealny pomysł dla swojego obrazu',
  description:
    'Odkryj różnorodne style artystyczne w sekcji Inspiracje na ObrazAI. Wybierz idealny motyw, aby stworzyć i zamówić unikalny obraz AI na płótnie, który ożywi Twoje wnętrze.',
};

const InspirationsPage = () => {
  return <InspirationsContent />;
};

export default InspirationsPage;
