import Button from '@mui/material/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <Link href="/gnm">
      <Button variant="contained">go gnm</Button>
    </Link>
  );
}
