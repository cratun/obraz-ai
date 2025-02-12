import { Container, Font, Img, Link, Tailwind, Text } from '@react-email/components';
import colors from 'tailwindcss/colors';
import { CanvasSize } from '@/app/_utils/sizes-utils';

const COMPANY_INFO = 'Cratun sp. z o.o. NIP: 4990690625 KRS: 0000971816';

const GiftCardSentEmail = ({
  recipientName = 'Przemek',
  recipientEmail = 'kacper.zabielski@cratun.test.com',
  giverName = 'Kacper',
  canvasSize = 'M',
}: {
  recipientName: string;
  recipientEmail: string;
  giverName: string;
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
    <Container align="center" className="items-center justify-center bg-neutral">
      <Container className="w-full px-10 pt-5">
        <Link className="m-auto block w-fit" href="https://www.obraz.ai">
          <Img
            alt="logo"
            src="https://public-assets-obraz-ai.s3.eu-central-1.amazonaws.com/email-logo.png"
            width={200}
          />
        </Link>
      </Container>
      <Container className="w-full px-10 pt-5">
        <Img
          alt="Karta podarunkowa przykład"
          className="mx-auto"
          src="https://public-assets-obraz-ai.s3.eu-central-1.amazonaws.com/gift-card-front.png"
        />
      </Container>
      <Container align="center" className="items-center justify-center p-5">
        <Text className="m-0 text-center text-2xl font-bold !text-text">Cześć {giverName}!</Text>
        <Text className="flex items-center justify-center text-center text-base !text-text">
          <span className="max-w-[450px]">
            <strong>{recipientName}</strong> otrzymuje elektroniczną kartę podarunkową na <strong>ObrazAI</strong> w
            rozmiarze{' '}
            <strong>
              {canvasSize}x{canvasSize} cm
            </strong>
          </span>
        </Text>
        <Text className="!my-6 flex text-center text-base !text-text">
          <span className="mx-auto">
            Wysłaliśmy ją na adres: <br />
            <strong>{recipientEmail}</strong>
          </span>
        </Text>
        <Text className="flex items-center justify-center text-center text-base !text-text">
          Dzięki Tobie, {recipientName} może spełnić swoje marzenia i przelać swoją wyobraźnię na płótno.
        </Text>
        <Container>
          <Text className="text-center text-base !text-text">
            <Link className="text-primary" href="https://www.obraz.ai">
              www.obraz.ai
            </Link>
          </Text>
          <Text className="text-center text-xs !text-black/60">{COMPANY_INFO}</Text>
        </Container>
      </Container>
    </Container>
  </Tailwind>
);

export default GiftCardSentEmail;
