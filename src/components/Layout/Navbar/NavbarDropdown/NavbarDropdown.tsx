import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from '@/components/ui/logoutButton';
import { Badge } from '@/components/ui/badge';

type NavbarDropdownProps = {
  title: string;
  user?: User | undefined;
};

export default function NavbarDropdown({ title, user }: NavbarDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="/Images/ninja.png" />
          <AvatarFallback>DH</AvatarFallback>
        </Avatar>
        <h1>Dojo Helpdesk</h1>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Badge>{user?.email}</Badge>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/tickets">Tickets</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
