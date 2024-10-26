import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import HomeSwiper from '@/app/_components/generate-examples-swiper';
import ReviewsSwiper from '@/app/_components/reviews-swiper';
import Typography from '@/app/_components/typography';

const ManualStep = ({ children, title, number }: { children: ReactNode; title: string; number: number }) => (
  <div className="flex flex-col gap-5">
    <div className="flex items-center gap-5">
      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#57C6A3] bg-primary">
        <Typography.H1 className="font-sans text-neutral">{number}</Typography.H1>
      </div>
      <Typography.H3>{title}</Typography.H3>
    </div>
    {children}
  </div>
);

const ManualPage = () => {
  return (
    <>
      <AppContainer className="relative pb-20 pt-[100px]">
        <AppContainer.Content className="text-text">
          <div className="flex w-full max-w-[739px] flex-col gap-10">
            <div className="flex flex-col gap-10 lg:my-auto">
              <Typography.H1 className="text-3xl font-bold leading-[120%] tracking-[1px] md:text-5xl">
                Nie martw się o opis obrazu - <span className="text-primary">nasze AI</span> go poprawi i ożywi Twoje
                marzenia!
              </Typography.H1>
              <Typography.Body className="max-w-[570px]">
                Nie musisz pisać perfekcyjnych opisów -{' '}
                <strong>nasza zaawansowana technologia automatycznie je ulepszy i poprawi</strong>, aby wygenerować
                najlepszy możliwy obraz. Wystarczy, że podasz <strong>podstawowy pomysł</strong> lub{' '}
                <strong>krótki opis</strong>, a my zajmiemy się resztą. Jeśli jednak chcesz dowiedzieć się więcej o tym,
                jak samodzielnie pisać skuteczne opisy, sprawdź poniższe wskazówki.
              </Typography.Body>
              <AppButton className="w-fit" href="/generate" LinkComponent={Link} variant="contained">
                Przejdź do generatora
              </AppButton>
            </div>
          </div>
        </AppContainer.Content>
        <div className="absolute bottom-0 right-0 top-0 hidden aspect-square w-full max-w-[300px] object-cover lg:block min-[1200px]:max-w-[400px] xl:max-w-[500px] 2xl:max-w-[600px]">
          <Image fill priority alt="" className="object-cover" src="/manual-hero.png" />
        </div>
      </AppContainer>
      <AppContainer className="relative aspect-[1056/1209] md:aspect-[1440/620]">
        <Image
          fill
          alt="Struktura opisu obrazu"
          className="hidden md:block"
          quality={100}
          src="/manual-prompt-structure-desktop.png"
        />
        <Image
          fill
          alt="Struktura opisu obrazu"
          className="md:hidden"
          quality={100}
          src="/manual-prompt-structure-mobile.png"
        />
      </AppContainer>
      <AppContainer className="py-10">
        <AppContainer.Content className="flex flex-col gap-10 text-text">
          <Typography.H2>Jak stworzyć dobry opis?</Typography.H2>
          <div className="flex flex-col gap-10 md:grid md:grid-cols-2 xl:gap-20">
            <ManualStep number={1} title="Bądź szczegółowy">
              <Typography.Body>
                Im więcej szczegółów zawrzesz w swoim opisie, tym dokładniej AI odwzoruje Twoją wizję.
              </Typography.Body>
              <ul className="ml-4 list-disc">
                <li>
                  <Typography.Body>
                    Opis postaci lub obiektów: uwzględnij wygląd, ubiór, kolory, tekstury.{' '}
                  </Typography.Body>
                </li>
                <li>
                  <Typography.Body>Tło i sceneria: opisz miejsce akcji, porę dnia, warunki pogodowe. </Typography.Body>
                </li>
                <li>
                  <Typography.Body>
                    Detale: dodaj elementy dodatkowe, takie jak akcesoria, rekwizyty, roślinność.
                  </Typography.Body>
                </li>
              </ul>
            </ManualStep>
            <ManualStep number={2} title="Używaj precyzyjnego języka">
              <Typography.Body>
                Precyzyjne słownictwo pomaga uniknąć nieporozumień i zapewnia dokładność.
              </Typography.Body>
              <ul className="ml-4 list-disc">
                <li>
                  <Typography.Body>
                    Unikaj ogólników: zamiast ładny krajobraz, napisz malownicze góry pokryte śniegiem z jeziorem u
                    podnóża.
                  </Typography.Body>
                </li>
                <li>
                  <Typography.Body>
                    Używaj konkretnych terminów: kolory (szkarłatny, turkusowy), style (art deco, impresjonizm), emocje
                    (melancholijny, radosny).
                  </Typography.Body>
                </li>
              </ul>
            </ManualStep>
            <ManualStep number={3} title="Określ styl i nastrój">
              <Typography.Body>
                Podaj preferowany styl artystyczny (np. realistyczny, surrealistyczny, kreskówkowy) oraz nastrój sceny
                (np. romantyczny, mroczny, wesoły), aby AI mogła dostosować ostateczny wygląd obrazu.
              </Typography.Body>
            </ManualStep>
            <ManualStep number={4} title="Strukturyzuj swój opis">
              <Typography.Body>
                Przedstaw pomysły w logicznej kolejności, zaczynając od głównego motywu, a następnie dodając szczegóły i
                tło. To ułatwi AI interpretację Twojego promptu i zapewni spójny wynik.
              </Typography.Body>
            </ManualStep>
          </div>
        </AppContainer.Content>
      </AppContainer>
      <AppContainer className="py-10">
        <AppContainer.Content className="flex-col gap-10 text-text">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-lg leading-[140%] tracking-[0.5px] text-primary">Przykładowe wygenerowane obrazy</h3>
            <Typography.H2 className="text-3xl font-semibold leading-[120%] tracking-[1px]">
              Brakuje Ci pomysłu?
            </Typography.H2>
          </div>
        </AppContainer.Content>
      </AppContainer>
      <HomeSwiper />
      <AppContainer className="py-10">
        <AppContainer.Content className="flex-wrap gap-5 text-text">
          <AppButton href="/generate" LinkComponent={Link} variant="contained">
            Przejdź do generatora
          </AppButton>
        </AppContainer.Content>
      </AppContainer>
      <ReviewsSwiper />
    </>
  );
};

export default ManualPage;
