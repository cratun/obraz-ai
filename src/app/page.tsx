import { ReactNode } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import { twJoin } from 'tailwind-merge';
import BulbIcon from './_assets/bulb-icon';
import CardIcon from './_assets/card-icon';
import StyleIcon from './_assets/style-icon';
import AppButton from './_components/app-button';
import AppContainer from './_components/app-container';
import AppLogo from './_components/app-logo';
import HomeSwiper from './_components/home-swiper';
const generateSteps = [
  {
    title: 'Opisz swój pomysł',
    description: 'Im bardziej szczegółowo opiszesz, tym lepszy rezultat uzyskasz.',
    Icon: BulbIcon,
  },
  {
    title: 'Wybierz styl',
    description: 'Przygotowaliśmy dla Ciebie style, abyś w prosty sposób mógł wybrać.',
    Icon: StyleIcon,
  },
  {
    title: 'Kup i zapłać',
    description: 'Nie musisz zakładać konta, kliknij kup i jednym kliknięcie kup obraz.',
    Icon: CardIcon,
  },
];

const GenerateStep = ({
  title,
  description,
  children,
  index,
}: {
  title: string;
  description: string;
  children: ReactNode;
  index?: number;
}) => (
  <div className="flex flex-col items-center gap-5">
    <div className="relative">
      <hr
        className={twJoin(
          'absolute left-1/2 top-1/2 h-2 -translate-y-1/2 border-y border-[#57C6A3] bg-primary',
          index === 0 && 'w-[50vw]',
          index && index !== 0 && 'w-screen -translate-x-1/2',
          !index && 'w-[50vw] -translate-x-[100%]',
        )}
      />
      <div className="relative z-10 flex aspect-square w-24 items-center justify-center rounded-full border border-[#57C6A3] bg-[#41BE96]">
        {children}
      </div>
    </div>
    <div className="flex flex-col gap-2.5">
      <h4 className="tracking-[1px text-xl font-semibold leading-[120%]">{title}</h4>
      <p className="leading-[150%] tracking-[0.5px]">{description}</p>
    </div>
  </div>
);

const Home = () => {
  return (
    <>
      <AppContainer className="pb-10 pt-5 lg:min-h-screen">
        <AppContainer.Content className="text-text">
          <div className="flex flex-col gap-10 lg:max-w-[400px]">
            <AppLogo />
            <div className="flex flex-col gap-10 lg:my-auto">
              <h1 className="text-6xl font-bold leading-[120%] tracking-[1px]">
                <span className="text-primary">Wydrukuj</span> obraz z wyobraźni<span className="text-primary">.</span>
              </h1>
              <div className="h-10 w-full bg-text"></div>
              <p className="leading-[150%] tracking-[0.5px]">
                Unikalny obraz ożywiający pomieszczenie, idealny pomysł na prezent, poczuj sie jak artysta. Wygeneruj
                swój obraz i wydrukuj już dziś.
              </p>
            </div>
            <span className="hidden lg:block">
              (Dowiedz się <KeyboardArrowDownIcon /> więcej)
            </span>
          </div>
        </AppContainer.Content>
        <div className="absolute right-0 top-0 hidden aspect-square h-full w-full max-w-[500px] object-cover lg:block min-[1100px]:max-w-[600px] xl:max-w-[800px] 2xl:max-w-[900px]">
          <div className="absolute bottom-5 left-5 right-5 top-5 z-10 flex items-end justify-start rounded-xl border-2 border-neutral p-5">
            <p className="font-bold text-neutral">
              &quot;Nowoczesny obraz, subtelnie oświetlony, z delikatnymi refleksami światła podkreślającymi
              detale.&quot;
            </p>
          </div>
          <Image fill alt="Przykładowy wygenerowany obraz" className="object-cover" src="/home-hero-image.png" />
        </div>
      </AppContainer>
      <div className="relative h-[500px] w-full bg-[radial-gradient(169.40%_89.55%_at_94.76%_6.29%,rgba(0,0,0,0.40)_0%,rgba(255,255,255,0.00)_100%)] lg:hidden">
        <div className="absolute bottom-2.5 left-2.5 right-2.5 top-2.5 z-10 flex items-end justify-start rounded-xl border-2 border-neutral p-2.5">
          <p className="font-bold text-neutral">
            &quot;Nowoczesny obraz, subtelnie oświetlony, z delikatnymi refleksami światła podkreślającymi detale.&quot;
          </p>
        </div>
        <Image fill alt="Przykładowy wygenerowany obraz" className="object-cover" src="/home-hero-image.png" />
      </div>
      <AppContainer className="overflow-hidden bg-primary py-10 lg:py-20">
        <AppContainer.Content className="flex-col gap-10 text-center text-neutral lg:gap-20">
          <h2 className="text-3xl font-semibold leading-[120%] tracking-[1px]">Jak wygenerować obraz?</h2>
          <div className="flex flex-col gap-10 lg:flex-row">
            {generateSteps.map(({ title, description, Icon }, index) => (
              <GenerateStep key={title} description={description} index={index} title={title}>
                <Icon className="h-11 w-auto" />
              </GenerateStep>
            ))}
            <GenerateStep
              description="Nie musisz zakładać konta, kliknij kup i jedym obraz, asdfff"
              title="Obraz jest Twój"
            >
              <Image alt="Wygenerowane zdjęcie" height={111} src="/home-generate-result.png" width={111} />
            </GenerateStep>
          </div>
        </AppContainer.Content>
      </AppContainer>
      <AppContainer className="py-10">
        <AppContainer.Content className="flex-col gap-10 text-text">
          <div className="flex flex-col gap-2.5">
            <h4 className="text-lg leading-[140%] tracking-[0.5px] text-primary">Ponad 1000 zadowolonych klientów</h4>
            <h2 className="text-3xl font-semibold leading-[120%] tracking-[1px]">Odkryj inspirujące projekty</h2>
          </div>
        </AppContainer.Content>
      </AppContainer>
      <HomeSwiper />
      <AppContainer className="py-10">
        <AppContainer.Content>
          <AppButton
            classes={{ contained: 'normal-case font-normal leading-[150%] tracking-[0.5px] px-5 py-2.5' }}
            variant="contained"
          >
            Przejdź do generatora
          </AppButton>
        </AppContainer.Content>
      </AppContainer>
      <AppContainer className="py-10">
        <AppContainer.Content className="flex flex-col gap-10">
          <h2 className="text-3xl font-semibold leading-[120%] tracking-[1px]">Nasze obrazy są wysokiej jakości</h2>
          <div className="flex flex-col gap-10 md:flex-row">
            <Image
              alt="Przykładowy obraz"
              className="md:hidden"
              height={500}
              quality={100}
              src="/home-quality-pitures-mobile.png"
              width={500}
            />
            <Image
              alt="Przykładowy obraz"
              className="hidden md:block"
              height={500}
              quality={100}
              src="/home-quality-pitures-desktop.png"
              width={850}
            />
            <div className="flex flex-col gap-5">
              <p className="max-w-md leading-[150%] tracking-[0.5px]">
                Unikalny obraz ożywiający pomieszczenie, idealny pomysł na prezent, poczuj sie jak artysta. Wygeneruj
                swój obraz i wydrukuj już dziś.
              </p>
              <AppButton
                classes={{ contained: 'normal-case font-normal leading-[150%] tracking-[0.5px] px-5 py-2.5 w-fit' }}
                variant="contained"
              >
                Przejdź do generatora
              </AppButton>
            </div>
          </div>
        </AppContainer.Content>
      </AppContainer>
    </>
  );
};

export default Home;
