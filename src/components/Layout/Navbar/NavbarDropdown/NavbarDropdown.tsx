import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LogoutButton from '@/components/ui/logoutButton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Profile } from '@/lib/Types/Profile/Profile';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type NavbarDropdownProps = {
  title: string;
  user?: User | undefined;
  profile?: Profile | undefined;
};

export default function NavbarDropdown({
  title,
  user,
  profile,
}: NavbarDropdownProps) {
  return (
    <Popover>
      <PopoverTrigger asChild className="flex items-center">
        <Button variant={'outline'}>
          <Avatar>
            <AvatarImage src="/Images/ninja.png" />
            <AvatarFallback>DH</AvatarFallback>
          </Avatar>
          <h1>{title}</h1>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center gap-2">
        {profile?.username || profile?.full_name || user?.email ? (
          <Badge>
            {profile?.username ?? profile?.full_name ?? user?.email}
          </Badge>
        ) : null}

        {profile ? (
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
        ) : null}

        <Link href="/" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/tickets" className="hover:underline">
          Tickets
        </Link>
        {user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? (
          <Link href="/users" className="hover:underline">
            Users
          </Link>
        ) : null}
        <LogoutButton />
      </PopoverContent>
    </Popover>
  );
}
