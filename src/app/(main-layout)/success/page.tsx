import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import { CONTACT_EMAIL } from '@/app/_utils/constants';
import { SerachParams } from '@/app/types';
import actionGetOrderInfo from './action-get-order-info';
import ResetCart from './components/reset-cart';
import LogoIcon from './logo-icon';

export const metadata: Metadata = {
  title: 'Dziękujemy za zamówienie | ObrazAI',
  description:
    'Dziękujemy za skorzystanie z ObrazAI. Twoje zamówienie jest w realizacji. Sprawdź szczegóły i oczekuj na wyjątkowy ObrazAI na płótnie!',
};

const PageSuccess = async ({ searchParams }: { searchParams: SerachParams }) => {
  if (!searchParams.session_id) redirect('/');
  const { customer, session } = await actionGetOrderInfo(searchParams.session_id as string);

  return (
    <>
      <ResetCart />
      <AppContainer className="pt-20 text-text">
        <div className="absolute right-0 top-0 -z-10 hidden h-screen w-full max-w-sm overflow-hidden bg-primary lg:block xl:max-w-md 2xl:max-w-xl">
          <LogoIcon />
        </div>
        <AppContainer.Content>
          <div className="flex w-fit max-w-xl flex-col gap-5 py-5 md:gap-10">
            <h1 className="text-3xl font-semibold leading-[120%] tracking-[1px]">
              <span className="text-primary">{customer.name?.split(' ')[0]}</span>, dziękujemy za zamówienie.
            </h1>
            <div className="flex flex-col gap-2.5 leading-[150%] tracking-[0.5px] md:gap-5">
              <div>Szczegóły Twojego zamówienia:</div>
              <div className="flex flex-col gap-1">
                <div>
                  {typeof session.payment_intent === 'string' && (
                    <>
                      <strong>Numer zamówienia:</strong> {session.payment_intent}
                    </>
                  )}
                </div>
                <div>
                  <strong>Wartość:</strong> {(session.amount_total || 0) / 100} zł
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <strong>Adres wysyłki: </strong> {customer.address?.city}, {customer.address?.line1},
                <div>{customer.address?.line2 && <>{customer.address?.line2}, </>}</div>
                <div>
                  {customer.address?.postal_code}, {customer.address?.country}
                </div>
              </div>
              <div>
                <strong>Adres email:</strong> {customer.email}
              </div>
              <div>
                <strong>Oczekiwany czas dostawy: 3 - 5 dni roboczych.</strong>
              </div>
              <div>
                Jeżeli masz jakiekolwiek pytania lub dane powyżej są niepoprawne skontaktuj się z nami pod adresem{' '}
                <strong>{CONTACT_EMAIL}</strong>.
              </div>
              <div>Na adres email podany w zamówieniu zostały przesłane szczegóły.</div>
              <div>Dziękujemy za skorzystanie z ObrazAI. Zachęcamy do ponownego zakupu.</div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <AppButton
                classes={{ contained: 'normal-case font-normal leading-[150%] tracking-[0.5px] px-5 py-2.5' }}
                href="/generate"
                LinkComponent={Link}
                startIcon={<AutoAwesomeRoundedIcon className="text-base" />}
                variant="contained"
              >
                Stwórz nowy obraz
              </AppButton>
              <AppButton
                classes={{ contained: 'normal-case font-normal leading-[150%] tracking-[0.5px] px-5 py-2.5' }}
                href="/"
                LinkComponent={Link}
                variant="outlined"
              >
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
