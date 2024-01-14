import TicketList from '@/app/(dashboard)/tickets/TicketList';
import { Suspense } from 'react';
import Loading from '@/app/(dashboard)/tickets/loading';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dojo Helpdesk | Tickets',
};

export default async function Tickets() {
  return (
    <main>
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2>Tickets</h2>
          <p>
            <small>Currently open tickets</small>
          </p>
        </div>
        <div>
          <Link href="/tickets/create">
            <Badge className="bg-green-500 transition-colors duration-300 hover:bg-green-400">
              Create
            </Badge>
          </Link>
        </div>
      </nav>

      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
}
