import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import PortraitIcon from '@mui/icons-material/Portrait';
import { IconButton } from '@mui/material';
import Link from 'next/link';
import AppButton from '@/app/_components/app-button';
import GenerateNavbarButtons from '@/app/_components/generate-navbar-buttons';
import NavbarCartIcon from './navbar-cart-icon';

const NavbarContentDesktop = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      <div className="hidden items-center gap-5 lg:flex">
        <AppButton
          className="text-accent"
          color="colorText"
          href="/generate/portrait"
          LinkComponent={Link}
          size="small"
          startIcon={<PortraitIcon className="text-xl text-accent" />}
        >
          <span className="text-xs font-semibold text-accent">Stwórz portret</span>
        </AppButton>
        {!isLoading && <GenerateNavbarButtons.Desktop />}
        {isLoading && (
          <AppButton color="colorText" href="/generate" LinkComponent={Link} size="small">
            Stwórz obraz
          </AppButton>
        )}
        <AppButton color="colorText" href="/inspirations" LinkComponent={Link} size="small">
          Inspiracje
        </AppButton>
        <AppButton color="colorText" href="/manual" LinkComponent={Link} size="small">
          Jak generować?
        </AppButton>
        <AppButton color="colorText" href="/contact?review=true" LinkComponent={Link} size="small">
          Opinia
        </AppButton>
      </div>
      <div className="hidden items-center gap-5 lg:flex">
        <IconButton href="/gallery" LinkComponent={Link} size="small">
          <PhotoLibraryRoundedIcon className="text-text" />
        </IconButton>
        <IconButton href="/cart" LinkComponent={Link} size="small">
          <NavbarCartIcon />
        </IconButton>
      </div>
    </>
  );
};

export default NavbarContentDesktop;
