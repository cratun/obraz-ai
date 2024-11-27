import { Container, Font, Img, Link, Tailwind, Text } from '@react-email/components';
import colors from 'tailwindcss/colors';

const COMPANY_INFO = 'Cratun sp. z o.o. NIP: 4990690625 KRS: 0000971816';

const OrderEmail = ({
  userName = 'X',
  price = 'x zł',
  orderNumber = 'xxxxxxx',
  imageId = 'xxxxxx-xxxx-xxxx-xxxx-xxxxxxx',
  deliveryNumber = 'xxxxxxxxxxxxxx',
  deliveryLink = 'https://tracktrace.dpd.com.pl/parcelDetails?typ=1&p1=',
  size = 'X',
  fullName = 'X X',
  address = 'X',
}: {
  userName: string;
  price: string;
  orderNumber: string;
  deliveryNumber: string;
  deliveryLink: string;
  imageId: string;
  size: string;
  fullName: string;
  address: string;
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
      <Text className="m-0 text-center text-2xl font-bold !text-text">Twoje zamówienie zostało nadane</Text>
      <Text className="text-base font-bold !text-text">Witaj {userName},</Text>
      <Text className="text-base !text-text">
        Z radością informujemy, że Twoje zamówienie nr {orderNumber} zostało właśnie nadane! Możesz śledzić status
        swojej przesyłki, klikając w poniższy link:
      </Text>
      <Link className="text-primary" href={deliveryLink}>
        {deliveryNumber}
      </Link>
      <Text className="text-base font-bold !text-text">Adres:</Text>
      <ul>
        <li>
          <Text className="text-base !text-text">{fullName}</Text>
        </li>
        <li>
          <Text className="text-base !text-text">{address}</Text>
        </li>
      </ul>
      <Text className="text-base font-bold !text-text">Szczegóły zamówienia:</Text>
      <ul>
        <li>
          <Text className="text-base !text-text">
            <b>Numer zamówienia:</b> {orderNumber}
          </Text>
        </li>
        <li>
          <Text className="text-base !text-text">
            <b>Identyfikator obrazu:</b> {imageId}
          </Text>
        </li>
        <li>
          <Text className="text-base !text-text">
            <b>Produkt:</b> Wygenerowany ObrazAI na płótnie
          </Text>
        </li>
        <li>
          <Text className="text-base !text-text">
            <b>Rozmiar:</b> {size}x{size} cm
          </Text>
        </li>
        <li>
          <Text className="text-base !text-text">
            <b>Cena:</b> {price}
          </Text>
        </li>
      </ul>
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
