import { MetadataRoute } from 'next';
import { getPosts } from './(main-layout)/blog/utils';
import { inspirationData, styles } from './(main-layout)/inspirations/utils';
import { ORIGIN_URL } from './_utils/constants';

const ROUTES = [
  '',
  '/generate',
  '/generate/buy',
  '/privacy-policy',
  '/cookies',
  '/terms-of-service',
  '/manual',
  '/contact',
  '/giftcard',
  '/gallery',
  '/cart',
  '/inspirations',
  '/blog',
  ...Object.keys(styles).map((style) => `/inspirations/${style}`),
  ...inspirationData.map(({ id, style }) => `/inspirations/${style}/${id}`),
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  return [...ROUTES, ...posts.map((el) => `/blog/${el.slug}`)].map((route) => ({
    url: `${ORIGIN_URL}${route}`,
    lastModified: new Date(),
  }));
}
