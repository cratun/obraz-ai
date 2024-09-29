import 'server-only';

import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import {
  GENERATION_TOKEN_COUNT_COOKIE,
  GENERATION_TOKEN_DAILY_LIMIT,
  GENERATION_TOKEN_RETENTION_HOURS,
} from './common';

export type GenerationTokenCookieData = {
  value: string;
  timestamp: string;
};

const getDefaultCookieValue = () => ({
  value: GENERATION_TOKEN_DAILY_LIMIT,
  timestamp: dayjs().toISOString(),
});

export const getGenerationTokenCountCookie = () => {
  const cookieStore = cookies();

  const generationTokenCookie = cookieStore.get(GENERATION_TOKEN_COUNT_COOKIE);

  if (!generationTokenCookie) {
    // Cookie doesn't exist; return the daily limit
    return getDefaultCookieValue();
  }

  // Parse the cookie value, which is now a JSON string
  let cookieData: GenerationTokenCookieData;
  try {
    cookieData = JSON.parse(generationTokenCookie.value) as GenerationTokenCookieData;
  } catch {
    // If parsing fails, assume the cookie is invalid and return the daily limit
    return getDefaultCookieValue();
  }

  const { value, timestamp } = cookieData;

  // Check if the timestamp is older than 24 hours
  const now = dayjs();
  const cookieTime = dayjs(timestamp);
  const diffInHours = now.diff(cookieTime, 'hour');

  if (diffInHours >= GENERATION_TOKEN_RETENTION_HOURS) {
    // More than 24 hours have passed; return the daily limit
    return getDefaultCookieValue();
  }

  return { value: parseInt(value, 10), timestamp };
};

export type ParsedGenerationTokenCookie = ReturnType<typeof getGenerationTokenCountCookie>;
