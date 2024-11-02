// app/actions/updateSpecialPromoCookie.ts

import 'server-only';

import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { SPECIAL_PROMO_COOKIE } from './common';

export type SpecialPromoCookie = {
  generationCount: number;
  expiresAt: string | null;
};

const defaultGenerationData: SpecialPromoCookie = { generationCount: 1, expiresAt: null };

const SpecialPromoCookieSchema = z.object({
  generationCount: z.number().int().min(1).max(3),
  expiresAt: z
    .string()
    .nullable()
    .refine(
      (val) => {
        if (val === null) return true;
        // Ensure that the string is a valid ISO date

        return dayjs(val).isValid();
      },
      {
        message: 'Invalid date format for expiresAt',
      },
    ),
});

export const updateSpecialPromoCookie = () => {
  const cookieStore = cookies();
  const generationCookie = cookieStore.get(SPECIAL_PROMO_COOKIE);
  let generationData: SpecialPromoCookie = defaultGenerationData;

  if (generationCookie) {
    try {
      // Parse and validate the cookie value using Zod
      const parsedData = JSON.parse(generationCookie.value);
      generationData = SpecialPromoCookieSchema.parse(parsedData);
    } catch (error) {
      console.error('Failed to parse or validate generationCount cookie:', error);
      // Reset to default if parsing or validation fails
      generationData = defaultGenerationData;
    }

    if (generationData.generationCount < 3) {
      // Increment the generation count
      generationData.generationCount += 1;
    } else if (generationData.generationCount === 3 && !generationData.expiresAt) {
      // Set 'expiresAt' to 4 hours from now
      generationData.expiresAt = dayjs().add(4, 'hour').toISOString();
    }
    // If generationCount is 3 and expiresAt is already set, do not modify
  }

  // Serialize the generation data to JSON string
  const cookieValue = JSON.stringify(generationData);

  // Set the cookie with updated value
  cookieStore.set(SPECIAL_PROMO_COOKIE, cookieValue);
};

export const getSpecialPromoCookie = (): SpecialPromoCookie => {
  const cookieStore = cookies();
  const generationCookie = cookieStore.get(SPECIAL_PROMO_COOKIE);
  let generationData: SpecialPromoCookie = defaultGenerationData;

  if (generationCookie) {
    try {
      // Parse and validate the cookie value using Zod
      const parsedData = JSON.parse(generationCookie.value);
      generationData = SpecialPromoCookieSchema.parse(parsedData);
    } catch (error) {
      console.error('Failed to parse or validate generationCount cookie:', error);
      // Reset to default if parsing or validation fails
      generationData = defaultGenerationData;
    }
  }

  return generationData;
};
