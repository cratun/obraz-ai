import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import Typography from '@/app/_components/typography';
import GiftCardFaq from './_components/giftcard-faq';
import GiftCardForm from './_components/giftcard-form';

export const metadata: Metadata = {
  title: 'ObrazAI - Karta Podarunkowa | Podaruj Sztukę z Wyobraźni',
  description:
    'Podaruj bliskim niepowtarzalną możliwość tworzenia własnych obrazów z ObrazAI. Kup kartę podarunkową i otwórz drzwi do świata kreatywności!',
};

const GitCardPage = () => {
  return (
    <>
      <AppContainer className="relative pb-10 pt-[--save-navbar-padding-top]">
        <AppContainer.Content className="flex-col items-center gap-5 text-center text-text">
          <div className="flex flex-col gap-1">
            <Typography.H4 className="text-base font-semibold text-primary lg:text-xl">
              ObrazAI - karta podarunkowa
            </Typography.H4>
            <Typography.H1 className="text-3xl md:text-4xl lg:text-5xl">
              Zrób komuś <span className="text-primary">prezent</span>.
              <br />
              Zawsze <span className="text-primary">idealny</span>.
            </Typography.H1>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <AppButton href="#buy-gift-card" LinkComponent={Link} size="large" variant="contained">
              Kup teraz
            </AppButton>
            <AppButton href="/" LinkComponent={Link} size="large" variant="outlined">
              Dowiedz się więcej
            </AppButton>
          </div>
        </AppContainer.Content>
      </AppContainer>
      <div className="relative flex h-[160px] justify-center overflow-hidden sm:h-[220px] md:h-[300px] lg:h-[413px]">
        <Image
          priority
          alt=""
          className="h-full w-auto max-w-[1184px] self-center"
          height={413}
          quality={100}
          src="/giftcard/main.png"
          width={1184}
        />
      </div>
      <AppContainer className="pb-10 pt-20 text-text">
        <AppContainer.Content>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="order-1 flex flex-col gap-10 md:order-none">
              <Image
                alt=""
                className="hidden md:block"
                height={324}
                quality={100}
                src="/giftcard/card-front.png"
                width={559}
              />
              <GiftCardFaq />
            </div>
            <div className="flex flex-col gap-5" id="buy-gift-card">
              <div className="flex flex-col gap-1">
                <span className="text-primary">Kup kartę podarunkową</span>
                <Typography.H1 className="text-3xl md:text-4xl lg:text-5xl">Zaskocz bliskich z ObrazAI</Typography.H1>
              </div>
              <Typography.Body className="max-w-[480px]">
                Podaruj prezent, który może być czymkolwiek z wyobraźni obdarowanego. ObrazAI, który jest zawsze
                idealnym dziełem. Skonfiguruj kartę podarunkową poniżej. <strong>Karta nie obejmuje portretów.</strong>
              </Typography.Body>
              <Image
                alt=""
                className="md:hidden"
                height={324}
                quality={100}
                src="/giftcard/card-front.png"
                width={559}
              />
              <GiftCardForm />
            </div>
          </div>
        </AppContainer.Content>
      </AppContainer>
    </>
  );
};

export default GitCardPage;
