import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import PortraitIcon from '@mui/icons-material/Portrait';
import { ButtonBase } from '@mui/material';
import Link from 'next/link';
import GenerateNavbarButtons from '@/app/_components/generate-navbar-buttons';
import NavbarCartIcon from './navbar-cart-icon';

const NavbarContentMobile = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex items-center gap-1 lg:hidden">
      <ButtonBase
        className="flex flex-col items-center gap-1 rounded-sm p-1 text-text"
        href="/generate/portrait"
        LinkComponent={Link}
      >
        <PortraitIcon className="text-xl text-primary" />
        <span className="text-xs font-semibold text-primary">Portret</span>
      </ButtonBase>
      <ButtonBase
        className="flex flex-col items-center gap-1 rounded-sm p-1 text-text"
        href="/inspirations"
        LinkComponent={Link}
      >
        <LightbulbRoundedIcon className="text-xl" />
        <span className="text-xs">Inspiracje</span>
      </ButtonBase>
      {!isLoading && <GenerateNavbarButtons.Mobile />}
      {isLoading && (
        <ButtonBase
          className="flex flex-col items-center gap-1 rounded-sm p-1 text-text"
          href="/generate"
          LinkComponent={Link}
        >
          <AutoAwesomeRoundedIcon className="text-xl" />
          <span className="text-xs">Twórz</span>
        </ButtonBase>
      )}
      <ButtonBase
        className="flex flex-col items-center gap-1 rounded-sm p-1 text-text"
        href="/cart"
        LinkComponent={Link}
      >
        <NavbarCartIcon />
        <span className="text-xs">Koszyk</span>
      </ButtonBase>
    </div>
  );
};

export default NavbarContentMobile;
