import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

type GetRouteParams = {
  params: {
    id: string;
  };
};

export async function DELETE(_: unknown, { params }: GetRouteParams) {
  const { id } = params;

  const supabase = createRouteHandlerClient({ cookies });

  const { error } = await supabase.from('Tickets').delete().eq('id', id);

  return NextResponse.json({ error });
}
