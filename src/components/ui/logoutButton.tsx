'use client';

import { Badge } from '@/components/ui/badge';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push('/login');
    }
    if (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Badge variant={`destructive`}>
        <button className="p-0 text-sm" onClick={handleLogout}>
          Logout
        </button>
      </Badge>
    </>
  );
}
