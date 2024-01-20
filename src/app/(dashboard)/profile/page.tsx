import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/Types/Database/Database.types';
import AccountForm from '@/app/(dashboard)/profile/AccountForm';
import { User, createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { Profile } from '@/lib/Types/Profile/Profile';

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

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const profile: Profile = (await getProfile(user as User)) as Profile;

  return <AccountForm user={user} profile={profile} />;
}
