import { Container, Font, Img, Link, Tailwind, Text } from '@react-email/components';
import colors from 'tailwindcss/colors';

const COMPANY_INFO = 'Cratun sp. z o.o. NIP: 4990690625 KRS: 0000971816';

const OrderEmail = ({
  userName = 'Jan',
  price = '200 zł',
  orderNumber = 'f123fsdfdsx1cv3',
  orderDate = '2021-10-10',
}: {
  userName: string;
  price: string;
  orderNumber: string;
  orderDate: string;
}) => (
  <Tailwind
    config={{
      theme: {
        colors: {
          transparent: 'transparent',
          current: 'currentColor',
          black: colors.black,
          white: colors.white,
          primary: '#3BAE89',
          accent: '#DA2D67',
          neutral: '#F3F3F3',
          text: '#4E4E4E',
        },
      },
    }}
  >
    <Font fallbackFontFamily="Helvetica" fontFamily="Helvetica" fontStyle="normal" fontWeight={400} />
    <Container align="center" className="items-center justify-center bg-neutral p-10">
      <Link className="m-auto block w-fit" href="https://www.obraz.ai">
        <Img alt="logo" src="https://public-assets-obraz-ai.s3.eu-central-1.amazonaws.com/email-logo.png" width={200} />
      </Link>
    </Container>
    <Container className="p-5">
      <Text className="m-0 text-center text-2xl font-bold !text-text">Twoje zamówienie zostało potwierdzone</Text>
      <Text className="text-base font-bold !text-text">Witaj {userName},</Text>
      <Text className="text-base !text-text">
        Dziękujemy za skorzystanie z naszej usługi i złożenie zamówienia na unikalny ObrazAI drukowany na płótnie!
      </Text>
      <Text className="text-base font-bold !text-text">Szczegóły zamówienia:</Text>
      <ul>
        <li>
          <Text className="text-base !text-text">
            <b>Numer zamówienia:</b> {orderNumber}
          </Text>
        </li>
        <li>
          <Text className="text-base !text-text">
            <b>Data złożenia zamówienia:</b> {orderDate}
          </Text>
        </li>
        <li>
          <Text className="text-base !text-text">
            <b>Wartość zamówienia:</b> {price}
          </Text>
        </li>
      </ul>
      <Text className="text-base !text-text">
        Twoje zamówienie jest obecnie w trakcie realizacji. Przewidywany czas dostawy to <b>3 - 5</b> dni roboczych. O
        wszelkich aktualizacjach będziemy informować Cię drogą mailową.
      </Text>
      <Text className="text-base !text-text">
        Jeśli masz jakiekolwiek pytania lub potrzebujesz dodatkowej pomocy, nasz zespół obsługi klienta jest do Twojej
        dyspozycji. Możesz się z nami skontaktować pod adresem: <b>kontakt@obraz-ai.com</b>.
      </Text>
      <Text className="text-base !text-text">
        Jeszcze raz dziękujemy za zaufanie i zakup w ObrazAI. Mamy nadzieję, że będziesz cieszyć się swoim nowym dziełem
        sztuki!
      </Text>
      <Text className="text-base !text-text">
        Pozdrawiamy serdecznie
        <br />
        Zespół ObrazAI
        <br />
        <Link className="text-primary" href="https://www.obraz.ai">
          www.obraz.ai
        </Link>
      </Text>
    </Container>
    <Container className="text-center text-xs !text-black/60">{COMPANY_INFO}</Container>
  </Tailwind>
);

export default OrderEmail;
