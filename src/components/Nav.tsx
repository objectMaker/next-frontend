'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Nav() {
  return (
    <>
      <div className="flex w-full flex-row items-center justify-between bg-cyan-400 p-2 pl-8">
        <h2>BLOG</h2>
        <Link href="/createUser">
          <Button>to CreateUser</Button>
        </Link>
      </div>
    </>
  );
}
