import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const H1 = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <h1 className={twMerge('text-4xl font-bold leading-[120%] tracking-[1px] md:text-5xl', className)}>{children}</h1>
  );
};

const H2 = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <h2 className={twMerge('text-3xl font-semibold leading-[120%] tracking-[1px]', className)}>{children}</h2>;
};

const H3 = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <h3 className={twMerge('text-2xl font-semibold leading-[120%] tracking-[1px]', className)}>{children}</h3>;
};

const H4 = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <h3 className={twMerge('text-xl font-medium leading-[1.2] tracking-[1px]', className)}>{children}</h3>;
};

const Body = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <p className={twMerge('text-base leading-[1.5] tracking-[0.5px]', className)}>{children}</p>;
};

const Typography = {
  H1,
  H2,
  H3,
  H4,
  Body,
};

export default Typography;
