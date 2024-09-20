import { ReactNode } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Raleway } from 'next/font/google';
import { twJoin } from 'tailwind-merge';
import AppButton from './_components/app-button';
import theme from './_utils/theme';
import Providers from './providers';
import './globals.css';

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pl">
      <body className={twJoin('bg-neutral', raleway.variable)} id="root">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Providers>
              <div className="flex flex-col">
                <header className="bg-gray-400 flex items-center justify-between">
                  Logo <AppButton variant="contained">CTA</AppButton>
                </header>
                <div>{children}</div>
              </div>
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
