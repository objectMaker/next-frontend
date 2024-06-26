'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Nav() {
  const a = 0;
  return (
    <>
      <div className="flex w-full flex-row items-center justify-between bg-[#2221] px-8 py-2 hover:bg-[#2222]">
        {['Mr.YU', 'TODO'].map((item) => (
          <div className="text-xl font-bold" key={item}>
            {item}
          </div>
        ))}
        {a ? (
          <Link href="/">
            <Button className="h-8">LOGOUT</Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button className="h-8">LOGIN</Button>
          </Link>
        )}
      </div>
    </>
  );
}
