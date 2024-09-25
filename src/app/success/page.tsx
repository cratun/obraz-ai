import Link from 'next/link';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import AppLogo from '@/app/_components/app-logo';
import { CONTACT_EMAIL } from '@/app/_utils/constants';
import { SerachParams } from '@/app/types';
import actionGetOrderInfo from './action-get-order-info';

const PageSuccess = async ({ searchParams }: { searchParams: SerachParams }) => {
  const { customer, session } = await actionGetOrderInfo(searchParams.session_id as string);

  return (
    <AppContainer>
      <AppContainer.Content className="flex max-w-2xl flex-col gap-10 py-5">
        <AppLogo />
        <h1 className="text-3xl font-semibold leading-[120%] tracking-[1px]">
          <span className="text-primary">{customer.name}</span>, dziękujemy za zamówienie.
        </h1>
        <p className="leading-[150%] tracking-[0.5px]">
          Szczegóły Twoje zamówienia:
          <br />
          <br />
          {typeof session.payment_intent === 'string' && (
            <>
              <strong>Numer zamówienia:</strong> {session.payment_intent}
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
          <strong>Oczekiwany czas wykonania 3-7 dni.</strong>
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
      </AppContainer.Content>
    </AppContainer>
  );
};

export default PageSuccess;
