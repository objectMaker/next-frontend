import '@/styles/globals.css';

import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';
import Nav from '@/components/Nav';
import { Toaster } from '@/components/ui/toaster';

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
        )}
      >
        <Nav></Nav>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
