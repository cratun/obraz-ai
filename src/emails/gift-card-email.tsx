import { Column, Container, Font, Img, Link, Row, Tailwind, Text } from '@react-email/components';
import colors from 'tailwindcss/colors';
import { CanvasSize } from '@/app/_utils/sizes-utils';

const COMPANY_INFO = 'Cratun sp. z o.o. NIP: 4990690625 KRS: 0000971816';

const GiftCardEmail = ({
  giverName = 'Martyna',
  receiverName = 'Kacper',
  promoCode = 'ABCDEF123',
  message = 'Wszystkiego najlepszego z okazji świąt bożego narodzenia',
  expirationDate = '20.11.2025',
  canvasSize = 'M',
}: {
  receiverName: string;
  giverName: string;
  promoCode: string;
  message?: string;
  expirationDate: string;
  canvasSize: CanvasSize;
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
    <Container align="center" className="bg-neutral">
      <Container align="center" className="items-center justify-center bg-neutral p-10">
        <Link className="m-auto block w-fit" href="https://www.obraz.ai">
          <Img
            alt="logo"
            src="https://public-assets-obraz-ai.s3.eu-central-1.amazonaws.com/email-logo.png"
            width={200}
          />
        </Link>
      </Container>
      <Img
        alt="Karta podarunkowa przykład"
        className="mx-auto"
        src="https://public-assets-obraz-ai.s3.eu-central-1.amazonaws.com/gift-card-front.png"
      />
      <Text className="m-0 p-5 text-center text-3xl !text-text">
        Cześć {receiverName}, {giverName} przekazuje Ci kartę podarunkową!
      </Text>

      {message && (
        <Row className="p-5 pb-10">
          <Column>
            <Img
              alt="Ikona wiadomości"
              src="https://public-assets-obraz-ai.s3.eu-central-1.amazonaws.com/message-icon.png"
            />
          </Column>
          <Column>
            <Text className="m-0 ml-5 text-base !text-primary">Wiadomość:</Text>
            <Text className="m-0 ml-5 text-2xl !text-text">{message}</Text>
          </Column>
        </Row>
      )}
      <Row className="bg-accent p-5">
        <Column>
          <Text className="text-md m-0 font-bold uppercase !text-white">Twój kod do wykorzystania:</Text>
        </Column>
        <Column>
          <Text className="m-0 text-right text-2xl uppercase !text-white">{promoCode}</Text>
        </Column>
      </Row>
      <Row className="p-5 pb-0">
        <Column>
          <Text className="m-0 text-xl !text-text">Data ważności: </Text>
        </Column>
        <Column>
          <Text className="m-0 text-right text-xl !text-primary">{expirationDate}</Text>
        </Column>
      </Row>
      <Row className="p-5">
        <Column>
          <Text className="m-0 text-xl !text-text">Rozmiar obrazu: </Text>
        </Column>
        <Column>
          <Text className="m-0 text-right text-xl !text-primary">
            {canvasSize}x{canvasSize}cm
          </Text>
        </Column>
      </Row>
      <Text className="m-0 p-5 text-2xl !text-text">Jak użyć karty podarunkowej? </Text>
      <ol>
        <li>
          <Text className="text-base !text-text">Wybierz obraz o rozmiarze napisanym powyżej.</Text>
        </li>
        <li>
          <Text className="text-base !text-text">
            Następnie przejdź do swojego koszyka i kliknij “Mam kod rabatowy lub kartę podarunkową”.
          </Text>
        </li>
        <li>
          <Text className="text-base !text-text">
            Zastosuj kod podany w tej karcie podarunkowej i dokończ zamówienie. Koszty wysyłki i podatków są już
            wliczone.
          </Text>
        </li>
      </ol>
      <Img
        alt="Instrukcja użycia karty podarunkowej"
        className="mx-auto"
        src="https://public-assets-obraz-ai.s3.eu-central-1.amazonaws.com/manual-giftcard.png"
      />
      <Text className="bg-primary p-5 text-base !text-white">
        Jeśli chcesz przekazać komuś tę kartę podarunkową w elegancki sposób, w załączniku znajdziesz gotowy do wydruku
        plik. Możesz go wydrukować i wręczyć w kopercie - idealnie nadaje się na każdą okazję!
      </Text>
      <Text className="p-5 text-base !text-text">
        Jeśli masz jakiekolwiek pytania lub potrzebujesz dodatkowej pomocy, nasz zespół obsługi klienta jest do Twojej
        dyspozycji. Możesz się z nami skontaktować pod adresem: <b>kontakt@obraz-ai.com</b>.
      </Text>
      <Text className="p-5 text-base !text-text">
        Pozdrawiamy serdecznie
        <br />
        Zespół ObrazAI
        <br />
        <Link className="text-primary" href="https://www.obraz.ai">
          www.obraz.ai
        </Link>
      </Text>
      <Text className="p-5 text-center text-xs !text-black/60">{COMPANY_INFO}</Text>
    </Container>
  </Tailwind>
);

export default GiftCardEmail;
