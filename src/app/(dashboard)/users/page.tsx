import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dojo Helpdesk | Users',
};

export default async function Users() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  const user = data?.session?.user;

  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();

  console.log(users);

  if (!data.session || user?.email !== process.env.ADMIN_EMAIL) {
    redirect('/login');
  }

  return <></>;
}
