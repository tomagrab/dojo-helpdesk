import Navbar from '@/components/Layout/Navbar/Navbar';
import { Metadata } from 'next';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Dojo Helpdesk | Dashboard',
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
