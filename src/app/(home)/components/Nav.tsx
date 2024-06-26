'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Nav() {
  const a = 0;
  return (
    <>
      <div className="flex w-full flex-row items-center justify-between bg-[#9991] px-8 py-2 text-white hover:bg-[#9992]">
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
          <Link href="/signIn">
            <Button className="h-8">SIGN IN</Button>
          </Link>
        )}
      </div>
    </>
  );
}
