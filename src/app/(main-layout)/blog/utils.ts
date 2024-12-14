import { cache } from 'react';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export type Base = {
  title: string;
  description: string;
};

export type Post = Base & {
  slug: string;
  date: string;
  body: string;
};

// `cache` is a React 18 feature that allows you to cache a function for the lifetime of a request.
// this means getPosts() will only be called once per page build, even though we may call it multiple times
// when rendering the page.
export const getPosts = cache(async () => {
  const posts = await fs.readdir('./posts/');

  return Promise.all(
    posts
      .filter((file) => path.extname(file) === '.mdx')
      .map(async (file) => {
        const filePath = `./posts/${file}`;
        const postContent = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(postContent);

        return { ...data, body: content } as Post;
      }),
  );
});

export const getPost = async (slug: string) => {
  const posts = await getPosts();

  return posts.find((post) => post?.slug === slug);
};

export default getPosts;
