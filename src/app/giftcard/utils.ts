import { z } from 'zod';

export const giftCardSchema = z.object({
  giverName: z.string(),
  recipientName: z.string(),
  recipientEmail: z.string(),
  canvasSize: z.union([z.literal('30'), z.literal('60'), z.literal('100')]),
});

export type GiftCardSchema = z.infer<typeof giftCardSchema>;
