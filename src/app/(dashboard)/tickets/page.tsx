import { Suspense } from 'react';
import Loading from '@/app/(dashboard)/tickets/loading';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Metadata } from 'next';
import { Ticket } from '@/lib/Types/Ticket/Ticket';
import {
  User,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import TicketDataTable from './TicketDataTable';

export const metadata: Metadata = {
  title: 'Dojo Helpdesk | Tickets',
};

async function getTickets() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from('Tickets')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Ticket[];
}

async function getUser() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }

  const user = data?.session?.user;

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export default async function Tickets() {
  const tickets: Ticket[] = await getTickets();
  const user: User = await getUser();
  console.log(user);
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
        <TicketDataTable user={user} tickets={tickets} />
      </Suspense>
    </main>
  );
}
