import { ReactNode } from 'react';
import AppFooter from '@/app/_components/app-footer';
import AppNavbar from '@/app/_components/app-navbar';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AppNavbar />
      <div className="grow">{children}</div>
      <AppFooter />
    </>
  );
};

export default MainLayout;
