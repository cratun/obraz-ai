import { MetadataRoute } from 'next';
import { ORIGIN_URL } from './_utils/constants';

const ROUTES = [
  '',
  '/generate',
  '/generate/buy',
  '/privacy-policy',
  '/cookies',
  '/terms-of-service',
  '/manual',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${ORIGIN_URL}${route}`,
    lastModified: new Date(),
  }));
}
