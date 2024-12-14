import { ReactNode } from 'react';
import { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import Link, { LinkProps } from 'next/link';
import Typography from '@/app/_components/typography';

export const mdxComponents: MDXComponents = {
  Link: (props: LinkProps) => {
    return <Link {...props} />;
  },
  // eslint-disable-next-line jsx-a11y/alt-text
  Image: (props: ImageProps) => <Image {...props} />,
  h1: ({ children }: { children?: ReactNode }) => <Typography.H1>{children}</Typography.H1>,
  h2: ({ children }: { children?: ReactNode }) => <Typography.H2>{children}</Typography.H2>,
  h3: ({ children }: { children?: ReactNode }) => <Typography.H3>{children}</Typography.H3>,
  body: ({ children }: { children?: ReactNode }) => <Typography.Body>{children}</Typography.Body>,
  Container: ({ children }: { children?: ReactNode }) => <div className="flex flex-col gap-5">{children}</div>,
  Date: ({ children }: { children?: ReactNode }) => (
    <Typography.Body className="text-sm font-bold text-text/60">{children}</Typography.Body>
  ),
  Hr: () => <hr className="h-[2px] w-full text-text/30" />,
};
