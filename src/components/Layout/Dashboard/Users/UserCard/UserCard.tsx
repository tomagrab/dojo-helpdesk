import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { User } from '@supabase/supabase-js';

type UserCardProps = {
  user: User;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className=" break-words">{user.email}</CardTitle>
        <CardDescription>Role: {user.role}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Created at: {user.created_at}</p>
        <p>Updated at: {user.updated_at}</p>
        <p>Confirmed at: {user.confirmed_at}</p>
        <p>Last sign in: {user.last_sign_in_at}</p>
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
