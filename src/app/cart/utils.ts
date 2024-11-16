import { z } from 'zod';

export const cartItemSchema = z.object({
  id: z.string(),
  imageId: z.string(),
  quantity: z.number().min(1).max(99),
  canvasSize: z.union([z.literal('30'), z.literal('60'), z.literal('100')]),
  creationDateTimestamp: z.number(),
});

export type CartItem = z.infer<typeof cartItemSchema>;
