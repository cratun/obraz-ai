'use client';

import AppContainer from '@/app/_components/app-container';
import AppLogo from '@/app/_components/app-logo';
import NavbarContentDesktop from './navbar-content-dekstop';
import NavbarContentMobile from './navbar-content-mobile';
import NavbarMobileDrawer from './navbar-mobile-drawer';

const AppNavbar = ({ isLoading = false }: { isLoading?: boolean }) => {
  return (
    <header className="fixed top-0 z-[100] flex w-full flex-col">
      {/* <PromoBar /> */}
      <div className="flex items-center justify-center bg-white px-5 py-1 lg:py-2">
        <AppContainer.Content className="items-center justify-between gap-2">
          <div className="flex items-center justify-between gap-1 lg:grow">
            <NavbarMobileDrawer isLoading={isLoading} />
            <AppLogo className="w-20 lg:w-[100px]" />
            <NavbarContentDesktop isLoading={isLoading} />
          </div>
          <NavbarContentMobile isLoading={isLoading} />
        </AppContainer.Content>
      </div>
    </header>
  );
};

export default AppNavbar;
