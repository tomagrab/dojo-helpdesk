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
import Link from 'next/link';
import { cookies } from 'next/headers';

async function getTickets() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from('Tickets')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error(error);
  }

  return data as Ticket[];
}

export default async function TicketList() {
  const tickets: Ticket[] = await getTickets();
  return (
    <>
      {tickets.map(ticket => (
        <Card
          key={ticket.id}
          className="mb-4 transition-shadow duration-300 hover:shadow-xl"
        >
          <Link href={`/tickets/${ticket.id}`}>
            <CardHeader>
              <CardTitle>{ticket.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{ticket.body.slice(0, 200)}...</p>
            </CardContent>
            <CardFooter className="flex-row justify-end">
              <Badge className={`pill ${ticket.priority}`}>
                {ticket.priority}
              </Badge>
            </CardFooter>
          </Link>
        </Card>
      ))}
      {tickets.length === 0 ? <p>No open tickets!</p> : null}
    </>
  );
}
