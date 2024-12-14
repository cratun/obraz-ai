import dayjs from 'dayjs';
import { Metadata } from 'next';
import Link from 'next/link';
import AppContainer from '@/app/_components/app-container';
import Typography from '@/app/_components/typography';
import { getPosts } from './utils';

export const metadata: Metadata = {
  title: 'ObrazAI - Blog',
  description:
    'Przeczytaj najnowsze artykuły na blogu ObrazAI. Dowiedz się więcej o technologii i inspiracjach do stworzenia swojego obrazu AI.',
};

const BlogPage = async () => {
  const posts = await getPosts();
  const sortedPosts = posts.sort((a, b) =>
    dayjs(a.date, 'DD-MM-YYYY').isBefore(dayjs(b.date, 'DD-MM-YYYY')) ? 1 : -1,
  );

  return (
    <AppContainer className="relative pb-10 pt-[--save-navbar-padding-top]">
      <AppContainer.Content className="max-w-3xl flex-col gap-10">
        <Typography.H1>Blog</Typography.H1>
        {sortedPosts.map((post) => (
          <Link key={post?.slug} className="flex flex-col gap-2.5" href={`/blog/${post?.slug}`}>
            <Typography.H3>{post?.title}</Typography.H3>
            <Typography.Body>{post?.description}</Typography.Body>
            <Typography.Body className="text-sm font-bold text-text/60">{post?.date}</Typography.Body>
          </Link>
        ))}
      </AppContainer.Content>
    </AppContainer>
  );
};

export default BlogPage;
