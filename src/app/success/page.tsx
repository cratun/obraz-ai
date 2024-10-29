import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Script from 'next/script';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import { CONTACT_EMAIL } from '@/app/_utils/constants';
import { SerachParams } from '@/app/types';
import actionGetOrderInfo from './action-get-order-info';
import LogoIcon from './logo-icon';

export const metadata: Metadata = {
  title: 'Dziękujemy za zamówienie | ObrazAI',
  description:
    'Dziękujemy za skorzystanie z ObrazAI. Twoje zamówienie jest w realizacji. Sprawdź szczegóły i oczekuj na wyjątkowy obraz AI na płótnie!',
};

const PageSuccess = async ({ searchParams }: { searchParams: SerachParams }) => {
  if (!searchParams.session_id) redirect('/');
  const { customer, session } = await actionGetOrderInfo(searchParams.session_id as string);

  return (
    <>
      <AppContainer className="pt-20">
        <div className="absolute right-0 top-0 -z-10 hidden h-screen w-full max-w-sm overflow-hidden bg-primary lg:block xl:max-w-md 2xl:max-w-xl">
          <LogoIcon />
        </div>
        <AppContainer.Content>
          <div className="flex w-fit max-w-xl flex-col gap-10 py-5">
            <h1 className="text-3xl font-semibold leading-[120%] tracking-[1px]">
              <span className="text-primary">{customer.name}</span>, dziękujemy za zamówienie.
            </h1>
            <p className="leading-[150%] tracking-[0.5px]">
              Szczegóły Twojego zamówienia:
              <br />
              <br />
              {typeof session.payment_intent === 'string' && (
                <>
                  <strong>Numer zamówienia:</strong> {session.payment_intent}
                </>
              )}
              <br />
              <br />
              {session.metadata && (
                <>
                  <strong>Rozmiar obrazu:</strong> {session.metadata.size}x{session.metadata.size} cm
                </>
              )}
              <br />
              <br />
              <strong>Wartość:</strong> {(session.amount_total || 0) / 100} zł
              <br />
              <br />
              <strong>Adres wysyłki: </strong> {customer.address?.city}, {customer.address?.line1},
              {customer.address?.line2 && <>{customer.address?.line2}, </>}
              {customer.address?.postal_code}, {customer.address?.country}
              <br />
              <br />
              <strong>Adres email:</strong> {customer.email}
              <br />
              <br />
              <strong>Oczekiwany czas realizacji zamówienia: 3 - 5 dni roboczych.</strong>
              <br />
              <br />
              Jeżeli masz jakiekolwiek pytania lub dane powyżej są niepoprawne skontaktuj się z nami pod adresem{' '}
              <strong>{CONTACT_EMAIL}</strong>
              <br />
              <br />
              Na adres email podany w zamówieniu zostały przesłane szczegóły. <br />
              <br />
              Dziękujemy za skorzystanie z ObrazAi. Zachęcamy do ponownego zakupu.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <AppButton
                classes={{ contained: 'normal-case font-normal leading-[150%] tracking-[0.5px] px-5 py-2.5' }}
                href="/generate"
                LinkComponent={Link}
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
      {session && customer && process.env.NODE_ENV !== 'development' && (
        <Script id="x-pixel-success" strategy="lazyOnload">
          {`twq('event', 'tw-opn45-opn73', {
    value: ${(session.amount_total || 0) / 100},
    currency: 'PLN',
    email_address: '${customer.email}',
    phone_number: ${customer.phone},
  });`}
        </Script>
      )}
    </>
  );
};

export default PageSuccess;
