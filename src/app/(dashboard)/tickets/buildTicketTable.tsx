'use client';
import { Ticket } from '@/lib/Types/Ticket/Ticket';
import {
  User,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getColumns } from './Columns';
import DataTable from './DataTable';

type TicketDataTableProps = {
  tickets: Ticket[];
  user: User;
};

export default function TicketDataTable({
  tickets,
  user,
}: TicketDataTableProps) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={getColumns(user)} data={tickets} />
    </div>
  );
}
