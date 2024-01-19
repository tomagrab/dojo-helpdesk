import { TicketType } from '@/lib/Types/Ticket/TicketType';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TicketDialog } from '@/components/Layout/Dashboard/Tickets/DataTable/Dialog/TicketDialog';
import { Button } from '@/components/ui/button';
import { MoreHorizontalIcon } from 'lucide-react';
import { DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';
import DeleteButton from '@/components/ui/deleteButton';
import { User } from '@supabase/supabase-js';

type ColumnsActionsProps = {
  ticket: TicketType;
  user: User;
};

export default function ColumnsActions({ ticket, user }: ColumnsActionsProps) {
  return (
    <TicketDialog ticket={ticket}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem className="j flex flex-col items-center">
            <Button variant="outline">
              <Link href={`/tickets/${ticket.id}`}>Open Ticket</Link>
            </Button>
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Button variant="outline">Preview Ticket</Button>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          {user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
          user.email === ticket.user_email ? (
            <DropdownMenuItem className="flex flex-col items-center">
              <DeleteButton id={ticket.id} />
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </TicketDialog>
  );
}
