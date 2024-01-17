import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from '@/components/ui/logoutButton';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

type NavbarProps = {
  user?: User | undefined;
};

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav className="flex justify-between">
      <div className="hidden items-center gap-2 md:flex">
        <Avatar>
          <AvatarImage src="/Images/ninja.png" />
          <AvatarFallback>DH</AvatarFallback>
        </Avatar>
        <h1>Dojo Helpdesk</h1>
        <Link href="/">Dashboard</Link>
        <Link href="/tickets">Tickets</Link>
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

      <DropdownMenu>
        <DropdownMenuTrigger>Dojo Helpdesk</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
