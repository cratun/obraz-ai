'use client';

import React, { useState } from 'react';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import { ButtonBase, Drawer, IconButton } from '@mui/material';
import Link from 'next/link';
import { bottomDrawerLinks } from '@/app/_utils/constants';
import AppButton from './app-button';
import AppContainer from './app-container';
import AppLogo from './app-logo';

const AppNavbar = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <header className="fixed top-0 z-[100] flex w-full flex-col">
      <div className="flex items-center justify-center bg-primary px-5">
        <AppContainer.Content className="flex gap-3 text-sm text-white">
          <span>
            -20% z kodem <span className="font-sans font-medium">JESIEN</span>
          </span>
          <span>|</span>
          <span>Darmowa dostawa</span>
        </AppContainer.Content>
      </div>
      <div className="flex items-center justify-center bg-white px-5 py-1 md:py-2">
        <AppContainer.Content className="items-center justify-between gap-2">
          <div className="flex items-center justify-between gap-1 md:grow">
            <IconButton className="p-1 md:hidden" color="primary" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
            <AppLogo />
            <div className="hidden items-center gap-5 md:flex">
              <AppButton
                color="colorText"
                href="/manual"
                LinkComponent={Link}
                size="small"
                startIcon={<InfoOutlinedIcon className="text-base" />}
              >
                Jak generować?
              </AppButton>
              <AppButton
                href="/gallery"
                size="small"
                startIcon={<PhotoLibraryRoundedIcon className="text-base" />}
                variant="outlined"
              >
                Twoje obrazy
              </AppButton>
              <AppButton
                href="/generate"
                size="small"
                startIcon={<AutoAwesomeRoundedIcon className="text-base" />}
                variant="contained"
              >
                Stwórz swój obraz
              </AppButton>
            </div>
          </div>
          <div className="flex items-center gap-1 md:hidden">
            <ButtonBase
              className="flex flex-col items-center gap-1 rounded-sm p-1 text-text"
              href="/gallery"
              LinkComponent={Link}
            >
              <PhotoLibraryRoundedIcon className="text-xl" />
              <span className="text-xs">Galeria</span>
            </ButtonBase>
            <ButtonBase
              className="flex flex-col items-center gap-1 rounded-sm p-1 text-text"
              href="/generate"
              LinkComponent={Link}
            >
              <AutoAwesomeRoundedIcon className="text-xl" />
              <span className="text-xs">Twórz</span>
            </ButtonBase>
          </div>
        </AppContainer.Content>
      </div>
      <Drawer
        anchor="left"
        classes={{ paper: 'w-full max-w-[300px]  p-5 gap-5' }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <AppButton
          color="colorText"
          href="/manual"
          LinkComponent={Link}
          startIcon={<InfoOutlinedIcon className="text-base" />}
          onClick={handleClose}
        >
          Jak generować?
        </AppButton>
        <hr className="h-1 w-full text-text/10" />
        <AppButton
          className="w-full"
          href="/generate"
          startIcon={<AutoAwesomeRoundedIcon className="text-base" />}
          variant="contained"
        >
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
    </header>
  );
};

export default AppNavbar;
