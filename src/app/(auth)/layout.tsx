'use client';

import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  return (
    <>
      <Toaster />
      <Link href="/" className="absolute right-7 top-2">
        <Button className="h-8">HOME</Button>
      </Link>

      <div className="pt-8 text-center text-2xl font-bold text-white">
        {segment?.toUpperCase?.() + ' PAGE'}
      </div>
      {children}
    </>
  );
}
