import { z } from 'zod';

export const giftCardSchema = z.object({
  giverName: z.string().min(1, { message: 'Pole jest wymagane' }),
  recipientName: z.string().min(1, { message: 'Pole jest wymagane' }),
  recipientEmail: z
    .string()
    .min(1, { message: 'Pole jest wymagane' })
    .email({ message: 'Adres email jest niepoprawny' }),
  canvasSize: z.union([z.literal('30'), z.literal('60'), z.literal('100')]),
  message: z.string().max(100, { message: 'Wiadomość może mieć maksymalnie 200 znaków' }),
});

export type GiftCardSchema = z.infer<typeof giftCardSchema>;
