'use client';

import { Theme } from '@radix-ui/themes';
import { Providers } from '@/components/providers';
import { Toaster } from 'sonner';
// import MswInit from '@/components/msw-init';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthInitializer } from '@/components/auth/auth-initializer';
import { UserPropertiesSync } from '@/components/analytics/UserPropertiesSync';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';

const queryClient = new QueryClient();

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <MswInit /> */}
      <Providers>
        <Theme>
          <AuthInitializer />
          <UserPropertiesSync />
          <AnalyticsProvider>{children}</AnalyticsProvider>
          <Toaster />
        </Theme>
      </Providers>
    </QueryClientProvider>
  );
}
