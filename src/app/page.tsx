import Button from '@mui/material/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Link href="/api">
        <Button variant="contained">go api</Button>
      </Link>
      <Link href="/gnm">
        <Button variant="contained">go gnm</Button>
      </Link>
    </>
  );
}
