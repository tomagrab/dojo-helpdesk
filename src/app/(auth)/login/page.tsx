'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import AuthForm from '@/app/(auth)/AuthForm';

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    setLoading(true);
    setError('');

    const supabase = createClientComponentClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      console.error(error);
    } else {
      router.push('/');
    }

    setLoading(false);
  };

  return (
    <main>
      <h2>Login</h2>
      {error ? (
        <div className="my-2 rounded-md border border-red-500 bg-red-100 p-2 text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : null}
      <AuthForm
        handleSubmit={handleSubmit}
        loading={loading}
        buttonLoadingText={`Logging You In...`}
        buttonLabel={`Log In`}
      />
    </main>
  );
}
