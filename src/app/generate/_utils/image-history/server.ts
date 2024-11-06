import 'server-only';
import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import { IMAGE_HISTORY_COOKIE } from '@/app/generate/_utils/common';
import { IMAGE_HISTORY_EXPIRY_DAYS, IMAGE_HISTORY_MAX_ENTRIES, ImageHistoryEntry, ImageHistorySchema } from './common';

export const getImageHistoryFromCookie = (): ImageHistoryEntry[] => {
  const cookieStore = cookies();
  const imageHistoryCookieValue = cookieStore.get(IMAGE_HISTORY_COOKIE)?.value;

  let imageHistory: ImageHistoryEntry[] = [];

  if (imageHistoryCookieValue) {
    try {
      const parsed = JSON.parse(imageHistoryCookieValue);
      imageHistory = ImageHistorySchema.parse(parsed);
    } catch (error) {
      console.error('Failed to parse image history cookie:', error);
      imageHistory = [];
    }
  }

  const now = dayjs();
  const expiryThreshold = now.subtract(IMAGE_HISTORY_EXPIRY_DAYS, 'day').unix();

  imageHistory = imageHistory.filter((entry) => entry.timestamp > expiryThreshold);

  return imageHistory;
};

export function updateImageHistoryCookie(imageId: string) {
  const cookieStore = cookies();
  const imageHistory = getImageHistoryFromCookie();

  const now = dayjs().unix();
  const newEntry: ImageHistoryEntry = { id: imageId, timestamp: now };

  const newImageHistory = [newEntry, ...imageHistory].slice(0, IMAGE_HISTORY_MAX_ENTRIES);

  cookieStore.set(IMAGE_HISTORY_COOKIE, JSON.stringify(newImageHistory), { maxAge: 60 * 60 * 24 * 365 });
}
