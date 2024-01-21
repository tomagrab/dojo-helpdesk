'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import AuthForm from '@/app/(auth)/AuthForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    setLoading(true);
    setError('');

    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
    }
    if (!error) {
      router.push('/verify');
    }

    setLoading(false);
  };

  return (
    <main>
      <h2>Sign Up</h2>

      {error ? (
        <div className="my-2 rounded-md border border-red-500 bg-red-100 p-2 text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : null}

      <AuthForm
        handleSubmit={handleSubmit}
        loading={loading}
        buttonLoadingText={`Signing You Up...`}
        buttonLabel={`Sign Up`}
      />
    </main>
  );
}
