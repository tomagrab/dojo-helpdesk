import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import LogoutButton from '@/components/ui/logoutButton';
import { User, createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import NavbarDropdown from './NavbarDropdown/NavbarDropdown';
import { redirect } from 'next/navigation';
import { Profile } from '@/lib/Types/Profile/Profile';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';

type NavbarProps = {
  user?: User | undefined;
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

export default async function Navbar({ user }: NavbarProps) {
  const profile: Profile = (await getProfile(user)) as Profile;

  return (
    <nav>
      <div className="md:hidden">
        <NavbarDropdown title="Dojo Helpdesk" user={user} profile={profile} />
      </div>

      <div className="hidden w-full md:flex md:justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/Images/ninja.png" />
            <AvatarFallback>DH</AvatarFallback>
          </Avatar>
          <h1>Dojo Helpdesk</h1>
          <Link href="/">Dashboard</Link>
          <Link href="/tickets">Tickets</Link>
          {user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? (
            <Link href="/users">Users</Link>
          ) : null}
        </div>
        {user || profile ? (
          <div className="flex items-center gap-2">
            <HoverCard>
              <HoverCardTrigger className="flex items-center gap-2">
                <Badge>{profile?.full_name ?? user?.email}</Badge>
                <Avatar>
                  <AvatarImage
                    src={profile.avatar_url ?? '/Images/ninja.png'}
                  />
                  <AvatarFallback>DH</AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent className="flex flex-col items-center gap-2">
                <Link href="/profile">
                  <Button variant={`ghost`}>Profile</Button>
                </Link>
                <LogoutButton />
              </HoverCardContent>
            </HoverCard>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Badge>
              <Link className="text-white" href={'/signup'}>
                Sign Up
              </Link>
            </Badge>
            <Badge>
              <Link className="text-white" href={'/login'}>
                Login
              </Link>
            </Badge>
          </div>
        )}
      </div>
    </nav>
  );
}
