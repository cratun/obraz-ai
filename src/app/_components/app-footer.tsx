'use client';
import Link from 'next/link';
import { footerLinks } from '@/app/_utils/constants';
import AppContainer from './app-container';
import AppLogo from './app-logo';
import AppSocials from './app-socials';
import Typography from './typography';

const AppFooter = () => {
  return (
    <footer className={'flex items-center justify-center border-t border-solid border-t-text/20 bg-white p-5'}>
      <AppContainer.Content className="grid grid-cols-1 flex-wrap justify-between gap-10 text-text md:flex md:gap-5">
        <AppLogo />
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="flex flex-col gap-2.5">
            <Typography.Body className="font-bold">{title}</Typography.Body>
            {Object.entries(links).map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
        ))}
        <AppSocials>
          <Typography.Body className="font-bold">Nasze sociale</Typography.Body>
        </AppSocials>
        <div className="flex w-full flex-col gap-5">
          <hr className="w-full text-text/20" />
          <Typography.Body className="text-xs text-text/60">
            © 2024 ObrazAI. Wszelkie prawa zastrzeżone.
          </Typography.Body>
        </div>
      </AppContainer.Content>
    </footer>
  );
};

export default AppFooter;
