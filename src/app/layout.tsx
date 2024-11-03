import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { GoogleTagManager } from '@next/third-parties/google';
import { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import Script from 'next/script';
import { twJoin } from 'tailwind-merge';
import AppFooter from './_components/app-footer';
import AppNavbar from './_components/app-navbar';
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
                <AppFooter />
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
        {process.env.NODE_ENV !== 'development' && (
          <Script id="x-pixel" strategy="afterInteractive">
            {`!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
twq('config','opn45');`}
          </Script>
        )}
      </body>
    </html>
  );
};

export default RootLayout;
