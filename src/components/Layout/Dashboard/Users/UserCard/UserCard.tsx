import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { User, createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

type UserCardProps = {
  user: User;
};

const formattedDate = (date: string) => {
  return new Date(date).toLocaleString();
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
          <Avatar>
            {profile?.avatar_url ? (
              <AvatarImage src={profile?.avatar_url} />
            ) : (
              <AvatarImage src={`/Images/ninja.png`} />
            )}
            <AvatarFallback>{user.email?.charAt(0)}</AvatarFallback>
          </Avatar>
          {profile?.username ? (
            <h2>{profile.username}</h2>
          ) : profile?.full_name ? (
            <h2>{profile.full_name}</h2>
          ) : (
            <h2>{user.email}</h2>
          )}
        </CardTitle>
        {/* Show the role if the logged in user is the admin */}
        {currentUser.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? (
          <CardDescription>Role: {user.role}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent>
        <p>Created at: {formattedDate(user.created_at)}</p>

        {user.last_sign_in_at ? (
          <p>Last sign in: {formattedDate(user.last_sign_in_at)}</p>
        ) : null}

        <h2>Tickets:</h2>
        {userTickets && userTickets.length > 0 ? (
          <div className="flex flex-col gap-2">
            {userTickets.map(ticket => (
              <Link
                key={ticket.id}
                href={`/tickets/${ticket.id}`}
                className="flex gap-2"
              >
                <Badge>{ticket.id}</Badge>
                <Badge>{`${ticket.title.slice(0, 15)}...`}</Badge>
              </Link>
            ))}
          </div>
        ) : (
          <p>No tickets</p>
        )}
      </CardContent>
    </Card>
  );
}

/* 
  * User type:

  {
    id: 'db815a20-fa43-4bc5-a8de-29735d4b574e',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'tskiomi@gmail.com',
    email_confirmed_at: '2024-01-15T21:12:20.552751Z',
    phone: '',
    confirmation_sent_at: '2024-01-15T21:12:05.934582Z',
    confirmed_at: '2024-01-15T21:12:20.552751Z',
    last_sign_in_at: '2024-01-19T20:16:19.655731Z',
    app_metadata: { provider: 'email', providers: [ 'email' ] },
    user_metadata: {},
    identities: null,
    created_at: '2024-01-15T21:12:05.929188Z',
    updated_at: '2024-01-19T20:16:19.657544Z'
  }

*/
