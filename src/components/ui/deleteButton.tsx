'use client';

import { deleteTicket } from '@/app/(dashboard)/tickets/actions';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type DeleteButtonProps = {
  id: string;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Badge variant={'destructive'}>
      <button
        className="p-0"
        onClick={() => startTransition(() => deleteTicket(id))}
        disabled={isPending}
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
    </Badge>
  );
}
