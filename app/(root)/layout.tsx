import StreamVideoProvider from '@/providers/StreamClientProvider';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Yoom',
  description: 'Video calling app',
  icons: {
    icon: '/icons/logo.svg',
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
