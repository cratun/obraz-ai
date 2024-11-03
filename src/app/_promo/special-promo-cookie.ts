import 'server-only';

import dayjs from 'dayjs';
import { cookies } from 'next/headers';
import Stripe from 'stripe';
import { z } from 'zod';
import { IS_SPECIAL_PROMO_ENABLED, SPECIAL_PROMO_COOKIE } from './utils';

export type SpecialPromoCookie = {
  generationCount: number;
  expiresAt: string | null;
  code: string | null;
};

const defaultGenerationData: SpecialPromoCookie = { generationCount: 1, expiresAt: null, code: null };

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
  code: z.string().nullable(),
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const updateSpecialPromoCookie = async () => {
  const cookieStore = cookies();
  const generationCookie = cookieStore.get(SPECIAL_PROMO_COOKIE);
  let generationData: SpecialPromoCookie = defaultGenerationData;

  if (!IS_SPECIAL_PROMO_ENABLED) {
    return;
  }

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
    }

    if (generationData.generationCount === 3 && !generationData.expiresAt) {
      // Set 'expiresAt' to 4 hours from now
      const expiresAtDate = dayjs().add(4, 'hour');
      generationData.expiresAt = expiresAtDate.toISOString();
      const promotionCode = await stripe.promotionCodes.create({
        coupon: process.env.STRIPE_COUPON_ID!,
        expires_at: expiresAtDate.unix(),
        max_redemptions: 1,
        restrictions: {
          first_time_transaction: true,
        },
      });
      generationData.code = promotionCode.code;
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
