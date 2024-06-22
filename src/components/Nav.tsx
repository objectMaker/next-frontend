'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Nav() {
  return (
    <>
      <div className="flex w-full flex-row justify-between">
        <div>start</div>
        <Link href="/createUser">
          <Button>to CreateUser</Button>
        </Link>
      </div>
    </>
  );
}
