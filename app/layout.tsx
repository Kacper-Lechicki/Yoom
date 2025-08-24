import type { Metadata } from 'next';

import './globals.css';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';

import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';

import yoomLogoIcon from '@/public/icons/yoom-logo.svg';

export const metadata: Metadata = {
  title: 'Yoom',
  description: 'Video calling app',
  icons: {
    icon: '/icons/logo.svg',
  },
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          variables: {
            colorForeground: '#FFFFFF',
            colorPrimary: '#0E78F9',
            colorBackground: '#1C1F2E',
            colorInput: '#252A41',
            colorInputForeground: '#FFFFFF',
            fontSize: '14px',
          },
          layout: {
            logoImageUrl: yoomLogoIcon,
            socialButtonsVariant: 'iconButton',
          },
          elements: {
            logoBox: {
              height: '2rem',
            },
            userButtonPopoverActionButton: {
              color: '#FFFFFF',
            },
          },
        }}
      >
        <body className={`${inter.className} bg-dark-2`}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
