import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/app/(main-layout)/blog/utils';
import AppContainer from '@/app/_components/app-container';
import ScrollToTopButton from '@/app/_components/scroll-to-top-button';
import { PostBody } from './_components/post-body';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return {
    title: `ObrazAI - ${post?.title}`,
    description: `${post?.description}`,
  };
}

const PostPage = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const post = await getPost(params.slug);
  if (!post) return notFound();

  return (
    <AppContainer className="relative pb-10 pt-[--save-navbar-padding-top] lg:min-h-screen">
      <ScrollToTopButton />
      <AppContainer.Content className="max-w-3xl flex-col gap-10 text-text [&_a]:text-accent [&_li]:list-disc [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2.5">
        <Link href="/blog">← Powrót do bloga</Link>
        <PostBody>{post?.body}</PostBody>
      </AppContainer.Content>
    </AppContainer>
  );
};

export default PostPage;

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({ slug: post?.slug }));
}
