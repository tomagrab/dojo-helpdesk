import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { User, createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import UserAdminDetails from './UserAdminDetails/UserAdminDetails';
import UserTickets from './UserTickets/UserTickets';
import UserHeader from './UserHeader/UserHeader';

type UserCardProps = {
  user: User;
};

const getLoggedInUser = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error(error);
    redirect('/');
  }

  if (!data?.session?.user) {
    redirect('/login');
  }

  return data?.session?.user;
};

const getUserTickets = async (user_email: string) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SERVICE_ROLE!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  const { data, error } = await supabase
    .from('Tickets')
    .select('*')
    .eq('user_email', user_email);

  if (error) {
    console.error(error);
    redirect('/');
  }

  return data;
};

const getProfile = async (user: User | undefined) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SERVICE_ROLE!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );

  try {
    const { data, error, status } = await supabase
      .from('profiles')
      .select(`full_name, username, website, avatar_url`)
      .eq('id', user?.id)
      .single();

    if (error) {
      console.error(error);
      redirect('/');
    }

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return data;
    }
  } catch (error) {
    console.error(error);
    redirect('/');
  }
};

export default async function UserCard({ user }: UserCardProps) {
  const profile = await getProfile(user);
  const userTickets = await getUserTickets(user.email!);
  const currentUser = await getLoggedInUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle className=" flex items-center gap-2 break-words">
          <UserHeader user={user} profile={profile!} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col  gap-4">
        <UserTickets tickets={userTickets} />
        <UserAdminDetails user={user} currentUser={currentUser} />
      </CardContent>
    </Card>
  );
}
