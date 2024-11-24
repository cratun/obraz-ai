'use client';

import { useQuery } from '@tanstack/react-query';
import Script from 'next/script';
import AppButton from '@/app/_components/app-button';

const COOKIE_DECLARATION_ID = 'cookies-declaration-id';

const PageContent = () => {
  useQuery({
    queryKey: ['cookie-declaration'],
    queryFn: () => {
      if (document.getElementById('CookieDeclaration')) return null;

      const content = document.getElementById(COOKIE_DECLARATION_ID);

      const script = document.createElement('script');
      script.id = 'CookieDeclaration';
      script.src = 'https://consent.cookiebot.com/83648cec-3d22-4112-bc4a-c41063eebf8a/cd.js';
      content?.appendChild(script);

      return null;
    },
  });

  return (
    <>
      <h2 className="text-3xl font-semibold leading-[120%] tracking-[1px]">Ciasteczka</h2>
      <Script src="https://consent.cookiebot.com/uc.js?cbid=83648cec-3d22-4112-bc4a-c41063eebf8a" />
      <AppButton
        className="w-fit"
        variant="contained"
        onClick={() => {
          if (window.Cookiebot) {
            window.Cookiebot?.renew();
          }
        }}
      >
        Edytuj ciasteczka
      </AppButton>
      <div id={COOKIE_DECLARATION_ID} />
    </>
  );
};

export default PageContent;
