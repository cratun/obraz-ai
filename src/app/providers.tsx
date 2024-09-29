'use client';

import { ReactNode } from 'react';
import { toast } from 'react-toastify';
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
      mutations: {
        onError: () => {
          toast.error('Wystąpił nieoczekiwany błąd, spróbuj ponownie później lub skontaktuj się z nami.', {
            toastId: 'default-mutation-error',
          });
        },
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();

    return browserQueryClient;
  }
};

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default Providers;
