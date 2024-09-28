'use client';

import { ReactNode, useRef } from 'react';
import { toast } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClientRef = useRef(
    new QueryClient({
      defaultOptions: {
        mutations: {
          onError: () => {
            toast.error('Wystąpił nieoczekiwany błąd, spróbuj ponownie później lub skontaktuj się z nami.', {
              toastId: 'default-mutation-error',
            });
          },
        },
      },
    }),
  );

  return <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>;
};

export default Providers;
