import { MouseEventHandler } from 'react';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { ButtonBase } from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import createQueryString from '@/app/_utils/create-query-string';
import AppButton from './app-button';

const useGeneratePageHref = () => {
  const searchParams = useSearchParams();

  const generateHref = `/generate?${createQueryString(
    [
      { name: 'prompt', value: searchParams.get('prompt') || '', action: 'add' },
      { name: 'generationStyle', value: searchParams.get('generationStyle') || '', action: 'add' },
    ],
    searchParams,
  )}`;

  return generateHref;
};

const GenerateNavbarButtonDesktop = () => {
  const generateHref = useGeneratePageHref();

  return (
    <AppButton
      href={generateHref}
      LinkComponent={Link}
      size="small"
      startIcon={<AutoAwesomeRoundedIcon className="text-base" />}
      variant="contained"
    >
      Stwórz swój obraz
    </AppButton>
  );
};

const GenerateNavbarButtonMobile = () => {
  const generateHref = useGeneratePageHref();

  return (
    <ButtonBase
      className="flex flex-col items-center gap-1 rounded-sm p-1 text-text"
      href={generateHref}
      LinkComponent={Link}
    >
      <AutoAwesomeRoundedIcon className="text-xl" />
      <span className="text-xs">Twórz</span>
    </ButtonBase>
  );
};

const GenerateDraverButton = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) => {
  const generateHref = useGeneratePageHref();

  return (
    <AppButton
      href={generateHref}
      LinkComponent={Link}
      startIcon={<AutoAwesomeRoundedIcon className="text-base" />}
      variant="contained"
      onClick={onClick}
    >
      Stwórz swój obraz
    </AppButton>
  );
};

const GenerateNavbarButtons = () => null;

GenerateNavbarButtons.Desktop = GenerateNavbarButtonDesktop;
GenerateNavbarButtons.Mobile = GenerateNavbarButtonMobile;
GenerateNavbarButtons.Drawer = GenerateDraverButton;

export default GenerateNavbarButtons;
