import 'server-only';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { IMAGE_HISTORY_COOKIE } from './common';

const getImageIdsHistoryFromCookie = () => {
  const cookieStore = cookies();
  const imageHistoryCookieValue = cookieStore.get(IMAGE_HISTORY_COOKIE)?.value;

  let imageIds: string[] = [];

  if (imageHistoryCookieValue) {
    try {
      imageIds = JSON.parse(imageHistoryCookieValue) as any;
      z.array(z.string()).parse(imageIds);
    } catch {
      // If parsing fails, reset to empty array
      imageIds = [];
    }
  }

  return imageIds;
};

export function updateImageHistoryCookie(imageId: string) {
  const cookieStore = cookies();
  const imageIds = getImageIdsHistoryFromCookie();

  const newImageIds = [imageId, ...imageIds].slice(0, 20);

  cookieStore.set(IMAGE_HISTORY_COOKIE, JSON.stringify(newImageIds));
}
