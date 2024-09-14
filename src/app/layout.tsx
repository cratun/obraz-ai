import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import './globals.css';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pl">
      <body>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
