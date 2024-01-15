'use client';

import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type DeleteButtonProps = {
  id: string;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);

    const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();

    if (json.error) {
      console.error(json.error);
      setLoading(false);
    }

    if (!json.error) {
      router.refresh();
      router.push(`/tickets`);
    }
  };

  return (
    <Badge variant={'destructive'}>
      <button className="p-0" onClick={handleClick}>
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </Badge>
  );
}
