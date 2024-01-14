import Link from 'next/link';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <nav>
        <h1>Dojo Helpdesk</h1>
        <Link href={`/signup`}>Sign Up</Link>
        <Link href={`/login`}>Login</Link>
      </nav>
      {children}
    </>
  );
}
