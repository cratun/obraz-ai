import { ReactNode } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from 'next/image';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';
import BulbIcon from '@/app/_assets/bulb-icon';
import CardIcon from '@/app/_assets/card-icon';
import StyleIcon from '@/app/_assets/style-icon';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import GeneratedExamplesSwiper from '@/app/_components/generate-examples-swiper';
import GenerateTextFieldHome from '@/app/_components/generate-text-field-home';
import InteriorSettingPicturesSwiper from '@/app/_components/interior-setting-pictures-swiper';
import ReviewsSwiper from '@/app/_components/reviews-swiper';
import Typography from '@/app/_components/typography';

const generateSteps = [
  {
    title: 'Opisz swój pomysł',
    description: 'Przekaż nam swoją wizję, a nasza sztuczna inteligencja przemieni ją w unikalne dzieło.',
    Icon: BulbIcon,
  },
  {
    title: 'Wybierz styl',
    description:
      'Wybierz spośród naszych starannie dobranych stylów, aby nadać swojemu dziełu niepowtarzalny charakter.',
    Icon: StyleIcon,
  },
  {
    title: 'Zamów z łatwością',
    description: 'Bez zakładania konta! Kliknij "Kup teraz" i sfinalizuj zamówienie w kilka chwil.',
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
          index === undefined && 'w-[50vw] -translate-x-[100%]',
        )}
      />
      <div className="relative z-10 flex aspect-square w-24 items-center justify-center rounded-full border border-[#57C6A3] bg-[#41BE96]">
        {children}
      </div>
    </div>
    <div className="flex flex-col gap-2.5">
      <h3 className="text-xl font-semibold leading-[120%] tracking-[1px]">{title}</h3>
      <p className="leading-[150%] tracking-[0.5px]">{description}</p>
    </div>
  </div>
);

const Home = () => {
  return (
    <>
      <AppContainer className="relative pb-20 pt-[100px] lg:min-h-screen">
        <AppContainer.Content className="text-text">
          <div className="flex w-full flex-col gap-10 md:max-w-[400px] lg:max-w-[500px]">
            <div className="flex flex-col gap-10 lg:my-auto">
              <Typography.H1 className="max-w-[400px]">
                <span className="text-primary">Ożyw</span> swoje marzenia na płótnie z pomocą{' '}
                <span className="text-primary">AI</span>!
              </Typography.H1>
              <GenerateTextFieldHome />
              <ul className="flex list-inside list-disc flex-col gap-1.5">
                <li className="text-base leading-[1.5] tracking-[0.5px]">
                  Stwórz <strong>dowolny obraz</strong>, jaki sobie wymarzysz, dzięki <strong>AI</strong>
                </li>
                <li className="text-base leading-[1.5] tracking-[0.5px]">
                  <strong>Wysokiej jakości</strong> obraz, gotowy do powieszenia
                </li>
                <li className="text-base leading-[1.5] tracking-[0.5px]">
                  Realizuj <strong>najśmielsze</strong> i najbardziej <strong>unikalne</strong> pomysły
                </li>
                <li className="text-base leading-[1.5] tracking-[0.5px]">
                  <strong>Łatwy proces</strong> — bez potrzeby umiejętności artystycznych
                </li>
              </ul>
            </div>
            <span className="hidden lg:block">
              (Dowiedz się więcej <KeyboardArrowDownIcon />)
            </span>
          </div>
        </AppContainer.Content>
        <div className="absolute bottom-0 right-0 top-0 hidden aspect-square w-full max-w-[320px] object-cover md:block min-[900px]:max-w-[400px] lg:max-w-[400px] xl:max-w-[700px] 2xl:max-w-[850px]">
          <Image
            fill
            priority
            alt=""
            className="object-cover"
            sizes="(max-width: 900px) 320px, (max-width: 1024px) 400px, (max-width: 1280px) 700px, 850px"
            src="/home-hero-image.png"
          />
        </div>
      </AppContainer>
      <div className="relative h-[400px] w-full bg-gradient-to-t from-black to-black/0 to-50% sm:h-[500px] md:hidden">
        <Image fill priority alt="" className="object-cover object-top" sizes="768px" src="/home-hero-image.png" />
      </div>
      <AppContainer className="overflow-hidden bg-primary py-10 lg:py-20">
        <AppContainer.Content className="flex-col gap-10 text-center text-neutral lg:gap-20">
          <Typography.H2>Jak wygenerować obraz?</Typography.H2>
          <div className="flex flex-col gap-10 lg:flex-row">
            {generateSteps.map(({ title, description, Icon }, index) => (
              <GenerateStep key={title} description={description} index={index} title={title}>
                <Icon className="h-11 w-auto" />
              </GenerateStep>
            ))}
            <GenerateStep
              description="Otrzymaj swój wyjątkowy obraz. Wydrukujemy go na płótnie najwyższej jakości i dostarczymy prosto do Ciebie!"
              title="Obraz jest Twój"
            >
              <Image
                alt="Wygenerowane zdjęcie"
                className="rounded-xl border border-[#57C6A3]"
                height={111}
                src="/home-generate-result.webp"
                width={111}
              />
            </GenerateStep>
          </div>
          <AppButton
            className="self-center"
            color="neutral"
            // @ts-ignore
            component={Link}
            href="/generate"
            size="large"
            variant="contained"
          >
            Wygeneruj obraz
          </AppButton>
        </AppContainer.Content>
      </AppContainer>
      <AppContainer className="py-10">
        <AppContainer.Content className="flex-col gap-10 text-text">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-lg leading-[140%] tracking-[0.5px] text-primary">
              Setki tysięcy unikalnych wygenerowanych obrazów
            </h3>
            <h2 className="text-3xl font-semibold leading-[120%] tracking-[1px]">
              Zainspiruj się naszymi wyjątkowymi realizacjami
            </h2>
          </div>
        </AppContainer.Content>
      </AppContainer>
      <GeneratedExamplesSwiper />
      <AppContainer className="py-10">
        <AppContainer.Content>
          <AppButton
            classes={{ contained: 'normal-case font-normal leading-[150%] tracking-[0.5px] px-5 py-2.5' }}
            href="/generate"
            LinkComponent={Link}
            variant="contained"
          >
            Stwórz swój obraz teraz
          </AppButton>
        </AppContainer.Content>
      </AppContainer>
      <AppContainer className="py-10 text-text">
        <AppContainer.Content className="flex flex-col gap-10">
          <h2 className="text-3xl font-semibold leading-[120%] tracking-[1px]">Najwyższa jakość gwarantowana</h2>
          <div className="flex flex-col gap-10 xl:flex-row">
            <Image
              alt="Przykładowy obraz"
              className="md:hidden"
              height={500}
              src="/home-quality-pitures-mobile.png"
              width={500}
            />
            <Image
              alt="Przykładowy obraz"
              className="hidden md:block"
              height={500}
              src="/home-quality-pitures-desktop.png"
              width={850}
            />
            <div className="flex flex-col gap-5">
              <p className="max-w-md leading-[150%] tracking-[0.5px]">
                Każdy obraz to wyjątkowe połączenie Twojej wyobraźni i potęgi sztucznej inteligencji, które razem tworzą
                dzieła najwyższej jakości. Odmień swoje wnętrza i zaskocz bliskich niepowtarzalnym prezentem. Stwórz i
                zamów swój obraz już dziś!
              </p>
              <AppButton
                href="/generate"
                LinkComponent={Link}
                variant="contained"
                classes={{
                  contained: 'normal-case font-normal leading-[150%] tracking-[0.5px] px-5 py-2.5 w-fit',
                }}
              >
                Stwórz swój obraz teraz
              </AppButton>
            </div>
          </div>
        </AppContainer.Content>
      </AppContainer>
      <ReviewsSwiper />
      <AppContainer className="py-10">
        <AppContainer.Content className="flex-col gap-10 text-text">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-lg leading-[140%] tracking-[0.5px] text-primary">
              Wysokiej jakości obraz do każdego wnętrza
            </h3>
            <h2 className="text-3xl font-semibold leading-[120%] tracking-[1px]">
              Twoja przestrzeń, Twoja wizja: wizualizacje obrazów
            </h2>
          </div>
        </AppContainer.Content>
      </AppContainer>
      <div className="pb-5">
        <InteriorSettingPicturesSwiper />
      </div>
      <AppContainer className="pb-10">
        <AppContainer.Content>
          <AppButton color="primary" href="/generate" LinkComponent={Link} size="large" variant="contained">
            Przekształć pomysł w obraz
          </AppButton>
        </AppContainer.Content>
      </AppContainer>
    </>
  );
};

export default Home;
