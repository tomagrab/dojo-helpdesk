import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <Avatar>
        <AvatarImage src="/Images/ninja.png" />
        <AvatarFallback>DH</AvatarFallback>
      </Avatar>
      <h1>Dojo Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
    </nav>
  );
}
