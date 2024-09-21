import { ReactNode } from 'react';
import Image from 'next/image';
import { twJoin } from 'tailwind-merge';
import BulbIcon from './_assets/bulb-icon';
import CardIcon from './_assets/card-icon';
import StyleIcon from './_assets/style-icon';
import AppContainer from './_components/app-container';
import AppLogo from './_components/app-logo';

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
      <AppContainer>
        <AppContainer.Content className="flex-col gap-10 py-5 text-text">
          <AppLogo />
          <h1 className="text-6xl font-bold leading-[120%] tracking-[1px]">
            <span className="text-primary">Wydrukuj</span> obraz z wyobraźni<span className="text-primary">.</span>
          </h1>
          <div className="h-10 w-full bg-text"></div>
          <p className="leading-[150%] tracking-[0.5px]">
            Unikalny obraz ożywiający pomieszczenie, idealny pomysł na prezent, poczuj sie jak artysta. Wygeneruj swój
            obraz i wydrukuj już dziś.
          </p>
        </AppContainer.Content>
      </AppContainer>
      <Image
        alt="Przykładowy wygenerowany obraz"
        className="aspect-square h-auto w-full"
        height={1000}
        quality={100}
        src="/home-hero-image.png"
        width={1000}
      />
      <AppContainer className="bg-primary py-10">
        <AppContainer.Content className="flex-col gap-10 py-5 text-center text-white">
          <h2 className="text-3xl font-semibold leading-[120%] tracking-[1px]">Jak wygenerować obraz?</h2>
          <div className="flex flex-col gap-10">
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
    </>
  );
};

export default Home;
