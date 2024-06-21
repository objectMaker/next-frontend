'use client';
import { Button } from '@/components/ui/button';

export default function Nav() {
  return (
    <>
      <div className="flex w-full flex-row justify-between">
        <div>start</div>
        <Button
          onClick={() => {
            alert('i am button');
          }}
        >
          i am button
        </Button>
      </div>
    </>
  );
}
