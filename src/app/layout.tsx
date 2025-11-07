import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import '@radix-ui/themes/styles.css';
import { ClientLayout } from '@/app/client-layout';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { AdsScript } from '@/components/ads/AdsScript';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '뉴비',
  description: '뉴스를 비교하고 탐색한다',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/newbee.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          maxWidth: 840,
          margin: '0 auto',
        }}
      >
        <Suspense fallback={null}>
          <GoogleAnalytics />
          <AdsScript />
        </Suspense>

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
