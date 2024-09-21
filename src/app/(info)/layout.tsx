import { ReactNode } from 'react';
import Link from 'next/link';
import AppButton from '@/app/_components/app-button';
import AppContainer from '@/app/_components/app-container';
import AppLogo from '@/app/_components/app-logo';

const InfoPagesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className="flex justify-center border-b border-text/20 bg-white px-5">
        <AppContainer.Content className="items-center justify-between py-5">
          <AppLogo />
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
        </AppContainer.Content>
      </header>
      <AppContainer>
        <AppContainer.Content className="flex-col gap-5 py-10 md:gap-10 [&_ol]:list-decimal [&_ol]:p-4">
          {children}
        </AppContainer.Content>
      </AppContainer>
    </>
  );
};

export default InfoPagesLayout;
