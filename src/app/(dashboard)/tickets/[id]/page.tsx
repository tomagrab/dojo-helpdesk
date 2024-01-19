import { Badge } from '@/components/ui/badge';

import { Ticket } from '@/lib/Types/Ticket/Ticket';
import {
  User,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import DeleteButton from '@/components/ui/deleteButton';
import TicketDisplay from './TicketDisplay';

type TicketDetailsProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: TicketDetailsProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data: ticket } = await supabase
    .from('Tickets')
    .select('*')
    .eq('id', params.id)
    .single();

  return {
    title: `Dojo Helpdesk | ${ticket?.title || 'Ticket not found'}`,
  };
}

async function getTicket(id: string) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from('Tickets')
    .select('*')
    .eq('id', id)
    .single();

  if (!data) {
    notFound();
  }

  return data;
}

export default async function TicketDetails({ params }: TicketDetailsProps) {
  const ticket: Ticket = await getTicket(params.id);
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  const user: User = data?.session?.user as User;
  return (
    <main>
      <nav className="flex justify-between">
        <div className="flex items-center gap-2">
          <h2>Ticket Details</h2>
          <Badge>#{ticket.id}</Badge>
          <Badge className={`pill ${ticket.priority}`}>{ticket.priority}</Badge>
        </div>
        {user?.email === ticket.user_email ||
        user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? (
          <div className="flex items-center">
            <DeleteButton id={ticket.id} />
          </div>
        ) : null}
      </nav>

      <TicketDisplay ticket={ticket} user={user} />
    </main>
  );
}
