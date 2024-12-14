import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from './markdown-components';

export const PostBody = ({ children }: { children: string }) => {
  return <MDXRemote components={mdxComponents} source={children} />;
};
