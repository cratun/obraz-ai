'use client';

import React, { ReactNode, useState } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClassNameValue, twMerge } from 'tailwind-merge';
import { bottomDrawerLinks } from '@/app/_utils/constants';
import AppButton from './app-button';
import AppContainer from './app-container';
import AppLogo from './app-logo';
import Typography from './typography';
const NavbarLink = ({
  href,
  children,
  onClick,
  className,
}: {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  className?: ClassNameValue;
}) => {
  const pathname = usePathname();

  return (
    <Link href={href} onClick={onClick}>
      <Typography.Body
        className={twMerge('font-medium text-text md:text-sm', pathname === href && 'font-bold underline', className)}
      >
        {children}
      </Typography.Body>
    </Link>
  );
};

const AppNavbar = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <header className="fixed top-0 z-[100] flex w-full items-center justify-center bg-white/80 px-5 py-2 backdrop-blur-sm">
        <AppContainer.Content className="items-center justify-between">
          <AppLogo />
          <div className="hidden items-center gap-5 md:flex">
            <NavbarLink href="/manual">Jak generować?</NavbarLink>
            <AppButton className="w-fit text-sm" href="/generate" variant="contained">
              Stwórz swój obraz
            </AppButton>
          </div>
          <IconButton className="p-1 md:hidden" color="primary" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
        </AppContainer.Content>
      </header>
      <Drawer
        anchor="right"
        classes={{ paper: 'w-full max-w-[300px]  p-5 gap-5' }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <NavbarLink className="flex items-center gap-2.5" href="/manual" onClick={handleClose}>
          <InfoOutlinedIcon />
          Jak generować?
        </NavbarLink>
        <hr className="h-1 w-full text-text/10" />
        <AppButton className="w-full" href="/generate" variant="contained">
          Stwórz swój obraz
        </AppButton>
        <div className="mt-auto flex flex-col gap-2.5">
          {Object.entries(bottomDrawerLinks).map(([label, href], i) => (
            <React.Fragment key={href}>
              <Link key={href} className="text-sm" href={href} onClick={handleClose}>
                {label}
              </Link>
              {i + 1 !== Object.entries(bottomDrawerLinks).length && <hr className="h-1 w-full text-text/10" />}
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default AppNavbar;
