import { Ticket } from '@/lib/Types/Ticket/TicketType';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const ticket: Ticket = await request.json();

  // Get Supabase Instance
  const supabase = createRouteHandlerClient({
    cookies,
  });

  // Get current user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Insert data into Supabase
  const { data, error } = await supabase
    .from('Tickets')
    .insert({
      ...ticket,
      user_email: session?.user?.email,
    })
    .select()
    .single();

  return NextResponse.json({ data, error });
}
