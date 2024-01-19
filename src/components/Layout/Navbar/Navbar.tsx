import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import LogoutButton from '@/components/ui/logoutButton';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import NavbarDropdown from './NavbarDropdown/NavbarDropdown';

type NavbarProps = {
  user?: User | undefined;
};

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav>
      <div className="md:hidden">
        <NavbarDropdown title="Dojo Helpdesk" user={user} />
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
        {user ? (
          <div className="flex items-center gap-2">
            <Badge>{user.email}</Badge>
            <LogoutButton />
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
