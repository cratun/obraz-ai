import { Metadata } from 'next';
import PageContent from './page-content';

export const metadata: Metadata = {
  title: 'Ciasteczka - ObrazAI | Twórz i zamawiaj unikalne obrazy',
};

const CookiesPage = () => {
  return <PageContent />;
};

export default CookiesPage;
