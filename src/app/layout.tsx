import '@/styles/globals.css';

import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import ErrorToast from './components/errorToast';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          'h-full w-full bg-cover bg-center bg-no-repeat',
        )}
        style={{
          backgroundImage: "url('/simple.jpg')",
        }}
      >
        {children}
        <Toaster />
        <ErrorToast />
      </body>
    </html>
  );
}
