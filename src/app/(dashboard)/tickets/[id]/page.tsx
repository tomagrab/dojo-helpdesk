import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Ticket } from '@/lib/Types/Ticket/Ticket';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import DeleteButton from '@/components/ui/deleteButton';
import EditTicketForm from './editTicketForm';

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
  const user = data?.session?.user;
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

      {user?.email === ticket.user_email ||
      user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? (
        <EditTicketForm
          id={ticket.id}
          title={ticket.title}
          body={ticket.body}
          priority={ticket.priority}
          user_email={ticket.user_email}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{ticket.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{ticket.body}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Badge>{ticket.user_email}</Badge>
            <Badge className={`pill ${ticket.priority}`}>
              {ticket.priority}
            </Badge>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
