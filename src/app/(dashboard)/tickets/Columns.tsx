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
import { Ticket } from '@/lib/Types/Ticket/Ticket';
import { User } from '@supabase/supabase-js';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  ChevronsDown,
  ChevronsRight,
  ChevronsUp,
  MoreHorizontal,
} from 'lucide-react';
import Link from 'next/link';

export const getColumns = (user: User): ColumnDef<Ticket>[] => [
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
          <Badge className="bg-blue-500">{`${ticket.title.slice(0, 10)}...`}</Badge>
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
              {ticket.priority}
              <ChevronsDown />
            </div>
          ) : ticket.priority === 'medium' ? (
            <div className="flex flex-row items-center gap-2">
              {ticket.priority}
              <ChevronsRight />
            </div>
          ) : (
            <div className="flex flex-row items-center gap-2">
              {ticket.priority}
              <ChevronsUp />
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

      return <Badge>{ticket.user_email}</Badge>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/tickets/${ticket.id}`}>Open Ticket</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
            user.email === ticket.user_email ? (
              <DropdownMenuItem className="flex flex-col items-center">
                <DeleteButton id={ticket.id} />
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
