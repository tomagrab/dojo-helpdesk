import { Badge } from '@/components/ui/badge';
import { TicketType } from '@/lib/Types/Ticket/TicketType';
import Link from 'next/link';

type UserTicketsProps = {
  tickets: TicketType[];
};

export default function UserTickets({ tickets }: UserTicketsProps) {
  return (
    <>
      <h2>Tickets:</h2>
      {tickets && tickets.length > 0 ? (
        <div className="flex flex-col gap-2">
          {tickets.map(ticket => (
            <Link
              key={ticket.id}
              href={`/tickets/${ticket.id}`}
              className="flex gap-2"
            >
              <Badge>{ticket.id}</Badge>
              <Badge>{`${ticket.title.slice(0, 15)}...`}</Badge>
            </Link>
          ))}
        </div>
      ) : (
        <p>No tickets</p>
      )}
    </>
  );
}
