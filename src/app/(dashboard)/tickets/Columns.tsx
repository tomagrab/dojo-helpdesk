'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DeleteButton from '@/components/ui/deleteButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TicketType } from '@/lib/Types/Ticket/TicketType';
import { User } from '@supabase/supabase-js';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  ChevronsDown,
  ChevronsRight,
  ChevronsUp,
  Mail,
  MoreHorizontal,
  Ticket,
} from 'lucide-react';
import Link from 'next/link';
import { TicketDialog } from './[id]/TicketDialog';
import { DialogTrigger } from '@/components/ui/dialog';

export const getColumns = (user: User): ColumnDef<TicketType>[] => [
  {
    accessorKey: 'id',
    accessorFn: ticket => {
      return ticket.id.toString();
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ticket #
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;

      return <Link href={`/tickets/${ticket.id}`}>{ticket.id}</Link>;
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <Link href={`/tickets/${ticket.id}`}>
          <Badge className="bg-blue-500">
            <div className="flex items-center gap-2">
              <Ticket />
              {`${ticket.title.slice(0, 10)}...`}
            </div>
          </Badge>
        </Link>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <Badge className={`pill ${ticket.priority}`}>
          {/* Ternary operator to check if the priority is low, medium, or high */}
          {ticket.priority === 'low' ? (
            <div className="flex flex-row items-center gap-2">
              <ChevronsDown />
              {ticket.priority}
            </div>
          ) : ticket.priority === 'medium' ? (
            <div className="flex flex-row items-center gap-2">
              <ChevronsRight />
              {ticket.priority}
            </div>
          ) : (
            <div className="flex flex-row items-center gap-2">
              <ChevronsUp />
              {ticket.priority}
            </div>
          )}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'user_email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Creator
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <Badge>
          <div className="flex items-center gap-2">
            <Mail />
            {`${ticket.user_email.slice(0, 10)}...`}
          </div>
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <TicketDialog ticket={ticket}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
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
    },
  },
];
