import { ReactNode } from 'react';
import AppContainer from '@/app/_components/app-container';

const InfoPagesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AppContainer>
      <AppContainer.Content className="flex-col gap-5 pb-20 pt-[100px] md:gap-10 [&_ol]:list-decimal [&_ol]:p-4">
        {children}
      </AppContainer.Content>
    </AppContainer>
  );
};

export default InfoPagesLayout;
