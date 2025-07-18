'use client';

import { Theme } from '@radix-ui/themes';
import { Providers } from '@/components/providers';
import { Toaster } from 'sonner';
// import MswInit from '@/components/msw-init';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <MswInit /> */}
      <Providers>
        <Theme>
          {children}
          <Toaster />
        </Theme>
      </Providers>
    </QueryClientProvider>
  );
}
