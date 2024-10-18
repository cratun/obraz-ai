import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { GoogleTagManager } from '@next/third-parties/google';
import { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import Link from 'next/link';
import Script from 'next/script';
import { twJoin } from 'tailwind-merge';
import AppContainer from './_components/app-container';
import AppLogo from './_components/app-logo';
import AppNavbar from './_components/app-navbar';
import { footerLinks, ORIGIN_URL } from './_utils/constants';
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
      {process.env.NODE_ENV !== 'development' && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />}

      <body className={twJoin('bg-neutral', raleway.variable)}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Providers>
              <ToastContainer bodyClassName="text-sm lg:text-base" />
              <div className="min-h-screen-responsive flex flex-col">
                <AppNavbar />
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
                    </div>
                  </AppContainer.Content>
                </footer>
              </div>
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
        {process.env.NODE_ENV !== 'development' && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2576537089212905');
fbq('track', 'PageView');`}
          </Script>
        )}
      </body>
    </html>
  );
};

export default RootLayout;
