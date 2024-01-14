import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Ticket } from '@/lib/Types/Ticket/Ticket';
import { notFound } from 'next/navigation';

export const dynamicParams = true;

export async function generateStaticParams() {
  const response = await fetch('http://localhost:4000/tickets');
  const tickets = await response.json();
  return tickets.map((ticket: Ticket) => ({
    id: ticket.id,
  }));
}

type TicketDetailsProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: TicketDetailsProps) {
  const ticket = await getTicket(params.id);
  return {
    title: `Dojo Helpdesk | ${ticket.title}`,
  };
}

async function getTicket(id: string) {
  const ticket = await fetch('http://localhost:4000/tickets/' + id, {
    next: {
      revalidate: 0,
    },
  });

  console.log(ticket);

  if (!ticket.ok) {
    notFound();
  }

  return ticket.json();
}

export default async function TicketDetails({ params }: TicketDetailsProps) {
  const ticket: Ticket = await getTicket(params.id);
  console.log(ticket);
  return (
    <main>
      <nav className="flex">
        <h2>Ticket Details</h2>
        <Badge>#{ticket.id}</Badge>
        <Badge className={`pill ${ticket.priority}`}>{ticket.priority}</Badge>
        <Badge variant={'destructive'}>DELETE</Badge>
      </nav>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{ticket.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{ticket.body}</p>
        </CardContent>
        <CardFooter>
          <Badge>{ticket.user_email}</Badge>
        </CardFooter>
      </Card>
    </main>
  );
}
