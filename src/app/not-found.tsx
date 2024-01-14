import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">There was a big problem</h2>
      <p>The page you are looking for does not exist!</p>
      <Link href={`/`}>
        <Badge>Dashboard</Badge>
      </Link>
    </main>
  );
}
