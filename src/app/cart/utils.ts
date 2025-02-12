import { z } from 'zod';

export const cartItemSchema = z.object({
  id: z.string(),
  imageId: z.string(),
  quantity: z.number().min(1).max(99),
  canvasSize: z.union([z.literal('S'), z.literal('M'), z.literal('L')]),
  creationDateTimestamp: z.number(),
  type: z.union([z.literal('square'), z.literal('portrait')]),
});

export type CartItem = z.infer<typeof cartItemSchema>;
