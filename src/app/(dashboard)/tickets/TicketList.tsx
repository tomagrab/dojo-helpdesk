import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Ticket } from '@/lib/Types/Ticket/Ticket';
import Link from 'next/link';

async function getTickets() {
  const tickets = await fetch('http://localhost:4000/tickets', {
    next: {
      revalidate: 0, // use 0 to opt out of using cache
    },
  });

  return tickets.json();
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
