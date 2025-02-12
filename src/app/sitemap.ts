import { MetadataRoute } from 'next';
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
  '/generate/portrait',
  '/generate/portrait/buy',
  '/inspirations',
  ...Object.keys(styles).map((style) => `/inspirations/${style}`),
  ...inspirationData.map(({ id, style }) => `/inspirations/${style}/${id}`),
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${ORIGIN_URL}${route}`,
    lastModified: new Date(),
  }));
}
