import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    redirect('/');
  }

  return (
    <>
      <nav>
        <h1>Dojo Helpdesk</h1>
        <Link href={`/signup`}>Sign Up</Link>
        <Link href={`/login`}>Login</Link>
      </nav>
      {children}
    </>
  );
}
