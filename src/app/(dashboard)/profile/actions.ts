'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Profile } from '@/lib/Types/Profile/Profile';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Database } from '@/lib/Types/Database/Database.types';

export async function updateProfile(profile: Profile) {
  const supabase = createServerActionClient<Database>({ cookies });

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Update the profile
  const { error } = await supabase.from('profiles').upsert({
    id: user?.id,
    ...profile,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    throw error;
  }

  revalidatePath('/profile');
  redirect('/profile');
}
