import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import { twJoin } from 'tailwind-merge';
import AppLogo from './_components/app-logo';
import { ORIGIN_URL } from './_utils/constants';
import theme from './_utils/theme';
import Providers from './providers';
import './globals.css';
import '@/app/_utils/dayjs-config';

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
});

export const metadata: Metadata = {
  title: 'ObrazAI - Ożyw swoje marzenia na płótnie | Twórz i zamawiaj unikalne obrazy',
  description:
    'Stwórz niepowtarzalny obraz z własnej wyobraźni z ObrazAI. Generuj, personalizuj i zamawiaj wysokiej jakości obrazy na płótnie. Idealny pomysł na prezent!',
  applicationName: 'ObrazAI',
  metadataBase: new URL(ORIGIN_URL),
  openGraph: {
    type: 'website',
    url: ORIGIN_URL,
    siteName: 'ObrazAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ObrazAI',
      },
    ],
  },
};

const RootLayout = () => {
  return (
    <html id="root" lang="pl">
      <body className={twJoin('bg-neutral', raleway.variable)}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Providers>
              <ToastContainer bodyClassName="text-sm lg:text-base" />
              <div className="min-h-screen-responsive flex h-full flex-col items-center justify-center gap-4">
                <AppLogo />
                <div className="flex flex-col gap-4 text-center">
                  <h1 className="text-2xl font-bold">ObrazAI jest niedostępne</h1>
                  <p className="text-base">W razie jakichkolwiek pytań napisz do nas!</p>
                  <a className="font-bold underline" href="mailto:cratun.dev@gmail.com">
                    cratun.dev@gmail.com
                  </a>
                </div>
              </div>
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
