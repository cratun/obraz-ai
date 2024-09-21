import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';
import AppContainer from './_components/app-container';
import AppLogo from './_components/app-logo';
import { CONTACT_EMAIL, footerLinks, ORIGIN_URL } from './_utils/constants';
import theme from './_utils/theme';
import Providers from './providers';
import './globals.css';

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

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html id="root" lang="pl">
      <body className={twJoin('bg-neutral', raleway.variable)}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Providers>
              <div className="min-h-screen-responsive flex flex-col">
                <div className="grow">{children}</div>
                <footer className="flex items-center justify-center border-t border-solid border-t-text/20 bg-white p-5">
                  <AppContainer.Content className="flex-wrap justify-between gap-5">
                    <AppLogo />
                    <div className="flex flex-wrap gap-5">
                      {Object.entries(footerLinks).map(([label, href]) => (
                        <Link key={href} className="text-text" href={href}>
                          {label}
                        </Link>
                      ))}
                      <Link className="text-text" href={`mailto:${CONTACT_EMAIL}`}>
                        Kontakt
                      </Link>
                    </div>
                  </AppContainer.Content>
                </footer>
              </div>
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
