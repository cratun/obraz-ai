import Image from 'next/image';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import Typography from '@/app/_components/typography';
import './styles.css';
import GiftCardForm from './_components/giftcard-form';

// <AppButton
//   onClick={() =>
//     actionBuyGiftCard({
//       body: {
//         giverName: 'Andrzej',
//         recipientName: 'Jakub',
//         recipientEmail: 'kacper.zabielski05@gmail.com',
//         canvasSize: '30',
//       },
//       cancelUrl: window.location.origin + '/giftcard',
//     })
//   }
// >
//   test
// </AppButton>

const GitCardPage = () => {
  return (
    <>
      <AppContainer className="relative pb-10 pt-[--save-navbar-padding-top]">
        <AppContainer.Content className="flex-col items-center gap-2.5 text-center text-text">
          <Typography.H4 className="font-semibold text-primary">ObrazAI - karta podarunkowa</Typography.H4>
          <Typography.H1 className="text-3xl md:text-4xl lg:text-5xl">
            Zrób komuś <span className="text-primary">prezent</span>.
            <br />
            Zawsze <span className="text-primary">idealny</span>.
          </Typography.H1>
          <AppButton size="large" variant="contained">
            Kup teraz
          </AppButton>
        </AppContainer.Content>
      </AppContainer>
      <div className="flex justify-center">
        <Image alt="" className="self-center" height={446} src="/giftcard/main.jpg" width={1199} />
      </div>
      <AppContainer className="pt-10 text-text">
        <AppContainer.Content>
          <div className="gift-card-form-grid grow gap-10">
            <div className="item-a flex flex-col">
              <div className="flex flex-col">
                <span className="text-primary">Kup kartę podarunkową</span>
                <Typography.H1 className="text-3xl md:text-4xl lg:text-5xl">Zaskocz bliskich z ObrazAI</Typography.H1>
              </div>
              <Typography.Body className="max-w-[480px]">
                Podaruj prezent, który może być czymkolwiek z wyobraźni obdarowanego. ObrazAI, który jest zawsze
                idealnym dziełem. Skonfiguruj kartę podarunkową poniżej.
              </Typography.Body>
            </div>
            <div className="item-b">
              <Image alt="" height={324} quality={100} src="/giftcard/card-front.png" width={559} />
            </div>
            <div className="item-c">
              <GiftCardForm />
            </div>
            <div className="item-d">D</div>
          </div>
        </AppContainer.Content>
      </AppContainer>
    </>
  );
};

export default GitCardPage;
