import { Metadata } from 'next';
import Policy from './policy.mdx';

export const metadata: Metadata = {
  title: 'Polityka prywatności - ObrazAI | Twórz i zamawiaj unikalne obrazy',
};

const PrivacyPolicyPage = () => {
  return (
    <>
      <h2 className="text-3xl font-semibold leading-[120%] tracking-[1px]">Polityka prywatności</h2>
      <Policy />
    </>
  );
};

export default PrivacyPolicyPage;
