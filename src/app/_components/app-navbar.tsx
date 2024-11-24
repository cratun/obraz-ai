'use client';

import React, { useState } from 'react';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Badge, ButtonBase, Drawer, IconButton } from '@mui/material';
import Link from 'next/link';
import GiftIcon from '@/app/_assets/gift-icon';
import PromoBar from '@/app/_promo/promo-bar';
import { bottomDrawerLinks } from '@/app/_utils/constants';
import { useCartStorage } from '@/app/cart/components/add-to-cart-button';
import AppButton from './app-button';
import AppContainer from './app-container';
import AppLogo from './app-logo';

const NavbarCartIcon = () => {
  const { cartItems } = useCartStorage();

  return (
    <Badge
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      badgeContent={cartItems.length}
      color="accent"
      overlap="circular"
      slotProps={{ badge: { className: 'size-[18px] min-w-[18px]' } }}
    >
      <ShoppingCartRoundedIcon className="text-xl" />
    </Badge>
  );
};

const AppNavbar = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <header className="fixed top-0 z-[100] flex w-full flex-col">
      <PromoBar />
      <div className="flex items-center justify-center bg-white px-5 py-1 lg:py-2">
        <AppContainer.Content className="items-center justify-between gap-2">
          <div className="flex items-center justify-between gap-1 lg:grow">
            <IconButton className="p-0 lg:hidden" color="primary" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
            <AppLogo className="w-20 lg:w-[100px]" />
            <div className="hidden items-center gap-5 lg:flex">
              <AppButton
                className="text-accent"
                color="colorText"
                href="/giftcard"
                LinkComponent={Link}
                size="small"
                startIcon={<GiftIcon className="h-auto w-4 pb-1" id="desktop" />}
              >
                Prezent
              </AppButton>
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
                color="colorText"
                href="/contact?review=true"
                LinkComponent={Link}
                size="small"
                startIcon={<ReviewsOutlinedIcon className="text-base" />}
              >
                Zostaw opinię
              </AppButton>
              <AppButton
                color="colorText"
                href="/gallery"
                LinkComponent={Link}
                size="small"
                startIcon={<PhotoLibraryRoundedIcon className="text-base" />}
              >
                Twoje obrazy
              </AppButton>
              <AppButton
                color="colorText"
                href="/cart"
                LinkComponent={Link}
                size="small"
                startIcon={<NavbarCartIcon />}
              >
                Koszyk
              </AppButton>
              <AppButton
                href="/generate"
                LinkComponent={Link}
                size="small"
                startIcon={<AutoAwesomeRoundedIcon className="text-base" />}
                variant="contained"
              >
                Stwórz swój obraz
              </AppButton>
            </div>
          </div>
          <div className="flex items-center gap-1 lg:hidden">
            <ButtonBase
              className="flex flex-col items-center gap-1 rounded-sm p-1 text-text"
              href="/giftcard"
              LinkComponent={Link}
            >
              <GiftIcon className="h-auto w-5" id="mobile" />
              <span className="text-xs font-semibold text-accent">Prezent</span>
            </ButtonBase>
            <ButtonBase
              className="itemsw-center flex flex-col gap-1 rounded-sm p-1 text-text"
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
            <ButtonBase
              className="flex flex-col items-center gap-1 rounded-sm p-1 text-text"
              href="/cart"
              LinkComponent={Link}
            >
              <NavbarCartIcon />
              <span className="text-xs">Koszyk</span>
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
          href="/generate"
          LinkComponent={Link}
          startIcon={<AutoAwesomeRoundedIcon className="text-base" />}
          variant="contained"
          onClick={handleClose}
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
