import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const H3 = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <h3 className={twMerge('text-2xl font-semibold leading-[120%] tracking-[1px]', className)}>{children}</h3>;
};

const Body = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <p className={twMerge('text-base leading-[1.5] tracking-[0.5px] text-text', className)}>{children}</p>;
};

const Typography = {
  H3,
  Body,
};

export default Typography;
