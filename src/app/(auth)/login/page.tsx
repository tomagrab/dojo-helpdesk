'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import AuthForm from '@/app/(auth)/AuthForm';

export default function Login() {
  const [error, setError] = useState(''); // [1
  const router = useRouter();
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
  ) => {
    e.preventDefault();
    setError('');

    const supabase = createClientComponentClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      router.push('/');
    }
    if (error) {
      setError(error.message); //
      console.error(error);
    }
  };

  return (
    <main>
      <h2>Login</h2>
      {error ? (
        <div className="my-2 rounded-md border border-red-500 bg-red-100 p-2 text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : null}
      <AuthForm handleSubmit={handleSubmit} />
    </main>
  );
}