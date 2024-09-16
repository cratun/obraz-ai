import { ReactNode } from 'react';
import { Button } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import './globals.css';
import Providers from './providers';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pl">
      <body>
        <AppRouterCacheProvider>
          <Providers>
            <div className="flex flex-col">
              <header className="flex items-center justify-between bg-gray-400">
                Logo
                <Button>CTA</Button>
              </header>
              <div>{children}</div>
            </div>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
