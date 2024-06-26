'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Nav() {
  const a = 0;
  return (
    <>
      <div className="flex w-full flex-row items-center justify-between bg-transparent px-12 py-4">
        <h2>Mr.YU</h2>
        <div>TODO</div>
        {a ? (
          <Link href="/">
            <Button>LOGOUT</Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button>LOGIN</Button>
          </Link>
        )}
      </div>
    </>
  );
}
