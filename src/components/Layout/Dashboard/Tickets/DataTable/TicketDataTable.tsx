'use client';
import { TicketType } from '@/lib/Types/Ticket/TicketType';
import { User } from '@supabase/auth-helpers-nextjs';
import { getColumns } from '../../../../../app/(dashboard)/tickets/Columns';
import DataTable from '../../../../../app/(dashboard)/tickets/DataTable';

type TicketDataTableProps = {
  tickets: TicketType[];
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
