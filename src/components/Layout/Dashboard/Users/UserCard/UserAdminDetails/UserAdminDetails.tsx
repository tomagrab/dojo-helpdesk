import { formattedDate } from '@/lib/Utilities/FormattedDate/FormattedDate';
import { User } from '@supabase/supabase-js';

type UserAdminDetailsProps = {
  user: User | null;
  currentUser: User | null;
};

/* 
  * User type properties:

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

export default function UserAdminDetails({
  user,
  currentUser,
}: UserAdminDetailsProps) {
  return (
    <>
      {currentUser?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? (
        <div>
          <p>Role: {user?.role}</p>
          <p>Created at: {formattedDate(user?.created_at!)}</p>
          {user?.last_sign_in_at ? (
            <p>Last sign in: {formattedDate(user?.last_sign_in_at!)}</p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
