'use client';
import Link from 'next/link';
import { footerLinks } from '@/app/_utils/constants';
import AppContainer from './app-container';
import AppLogo from './app-logo';

const AppFooter = () => {
  return (
    <footer className={'flex items-center justify-center border-t border-solid border-t-text/20 bg-white p-5'}>
      <AppContainer.Content className="flex-wrap justify-between gap-5">
        <AppLogo />
        <div className="flex flex-wrap gap-5">
          {Object.entries(footerLinks).map(([label, href]) => (
            <Link key={href} className="text-text" href={href}>
              {label}
            </Link>
          ))}
        </div>
      </AppContainer.Content>
    </footer>
  );
};

export default AppFooter;
