import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface AppContainerProps {
  children: ReactNode;
  className?: string;
}

const AppContainer = ({ children, className }: AppContainerProps) => (
  <section className={twMerge('flex justify-center px-5', className)}>{children}</section>
);

const AppContainerContent = ({ children, className }: AppContainerProps) => (
  <div className={twMerge('flex max-w-screen-xl grow', className)}>{children}</div>
);

AppContainer.Content = AppContainerContent;
export default AppContainer;
