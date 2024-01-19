'use client';

import { TicketType } from '@/lib/Types/Ticket/TicketType';
import { User } from '@supabase/supabase-js';
import { ColumnDef } from '@tanstack/react-table';
import {
  ChevronsDown,
  ChevronsRight,
  ChevronsUp,
  Mail,
  Ticket,
} from 'lucide-react';
import Link from 'next/link';
import ColumnHeader from '@/components/ui/ColumnHeader';
import ColumnsActions from './ColumnsActions';
import ColumnCell from '@/components/ui/ColumnCell';

export const getColumns = (user: User): ColumnDef<TicketType>[] => [
  {
    accessorKey: 'id',
    accessorFn: ticket => {
      return ticket.id.toString();
    },
    header: ({ column }) => {
      return (
        <ColumnHeader
          title={`Ticket #`}
          clickEvent={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
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
        <ColumnHeader
          title={`Title`}
          clickEvent={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <Link href={`/tickets/${ticket.id}`}>
          <ColumnCell badgeColor={`blue`}>
            <Ticket />
            {`${ticket.title.slice(0, 10)}...`}
          </ColumnCell>
        </Link>
      );
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => {
      return (
        <ColumnHeader
          title={`Priority`}
          clickEvent={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <ColumnCell badgeClassName={`pill ${ticket.priority}`}>
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
        </ColumnCell>
      );
    },
  },
  {
    accessorKey: 'user_email',
    header: ({ column }) => {
      return (
        <ColumnHeader
          title={`Creator`}
          clickEvent={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        />
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <ColumnCell>
          <Mail />
          {`${ticket.user_email.slice(0, 10)}...`}
        </ColumnCell>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const ticket = row.original;
      return <ColumnsActions ticket={ticket} user={user} />;
    },
  },
];
