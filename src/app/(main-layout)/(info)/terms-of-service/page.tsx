import { Metadata } from 'next';
import Tos from './tos.mdx';

export const metadata: Metadata = {
  title: 'Regulamin - ObrazAI | Twórz i zamawiaj unikalne obrazy',
};

const TosPage = () => {
  return (
    <>
      <h2 className="text-3xl font-semibold leading-[120%] tracking-[1px]">Regulamin sklepu internetowego ObrazAI</h2>
      <Tos />
    </>
  );
};

export default TosPage;
