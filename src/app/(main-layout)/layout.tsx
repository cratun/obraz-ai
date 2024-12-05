import { ReactNode, Suspense } from 'react';
import AppFooter from '@/app/_components/app-footer';
import AppNavbar from '@/app/_components/app-navbar/app-navbar';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Suspense fallback={<AppNavbar isLoading />}>
        <AppNavbar />
      </Suspense>
      <div className="grow">{children}</div>
      <AppFooter />
    </>
  );
};

export default MainLayout;
