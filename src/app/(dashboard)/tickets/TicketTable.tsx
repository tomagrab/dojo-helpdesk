import { Ticket } from "@/lib/Types/Ticket/Ticket";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type TableTableProps = {
  tickets: Ticket[];
};

export default async function TicketTable({ tickets }: TableTableProps) {
  return (
    <>
      <Table>
        <TableCaption>
          {tickets.length === 0 ? "No open tickets!" : "Open Tickets"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Ticket #</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>User Email</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.id}</TableCell>
              <TableCell>
                <Badge className={`pill ${ticket.priority}`}>
                  {ticket.priority}
                </Badge>
              </TableCell>
              <TableCell>{`${ticket.title.slice(0, 10)}...`}</TableCell>
              <TableCell>{ticket.user_email}</TableCell>
              <TableCell className="text-right">
                <Link href={`/tickets/${ticket.id}`}>
                  <Badge className="bg-blue-500 transition-colors duration-300 hover:bg-blue-400">
                    Open ticket
                  </Badge>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
