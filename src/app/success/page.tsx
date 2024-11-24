import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import AppLogo from '@/app/_components/app-logo';
import Typography from '@/app/_components/typography';
import { SerachParams } from '@/app/types';
import getOrderInfo from './action-get-order-info';
import ResetCart from './components/reset-cart';
import LogoIcon from './logo-icon';

export const metadata: Metadata = {
  title: 'ObrazAI | Dziękujemy za zamówienie',
  description:
    'Dziękujemy za skorzystanie z ObrazAI. Twoje zamówienie jest w realizacji. Sprawdź szczegóły i oczekuj na wyjątkowy ObrazAI na płótnie!',
};

const PageSuccess = async ({ searchParams }: { searchParams: SerachParams }) => {
  if (!searchParams.session_id) redirect('/');
  await getOrderInfo(searchParams.session_id as string);

  return (
    <>
      <ResetCart />
      <AppContainer className="min-h-screen text-text">
        <div className="absolute right-0 top-0 -z-10 hidden h-screen w-full max-w-sm overflow-hidden bg-primary lg:block xl:max-w-md 2xl:max-w-xl">
          <LogoIcon />
        </div>
        <AppContainer.Content className="items-center justify-center lg:justify-start">
          <div className="flex w-fit max-w-xl flex-col items-center gap-5 text-center md:gap-10">
            <div className="-mt-5 mb-5 lg:hidden">
              <AppLogo />
            </div>
            <TaskAltRoundedIcon className="text-[250px] text-primary lg:text-[300px]" />
            <div className="flex flex-col gap-2.5">
              <Typography.H1 className="text-2xl md:text-4xl">Płatność zakończona pomyślnie</Typography.H1>
              <Typography.Body>
                Dziękujemy za zakup ObrazAI. Szczegóły Twojego zamówienia zostały wysłane na podany adres e-mail.
              </Typography.Body>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <AppButton
                href="/generate"
                LinkComponent={Link}
                size="large"
                startIcon={<AutoAwesomeRoundedIcon className="text-base" />}
                variant="contained"
              >
                Stwórz nowy obraz
              </AppButton>
              <AppButton href="/" LinkComponent={Link} size="large" variant="outlined">
                Wróć do strony głównej
              </AppButton>
            </div>
          </div>
        </AppContainer.Content>
      </AppContainer>
    </>
  );
};

export default PageSuccess;
