import { z } from 'zod';

const nameValidator = z
  .string()
  .min(1, { message: 'Pole jest wymagane' })
  .max(24, { message: 'Maksymalna długość wynosi 24 znaki' });

export const giftCardSchema = z.object({
  giverName: nameValidator,
  recipientName: nameValidator,
  recipientEmail: z
    .string()
    .min(1, { message: 'Pole jest wymagane' })
    .email({ message: 'Adres email jest niepoprawny' }),
  canvasSize: z.union([z.literal('S'), z.literal('M'), z.literal('L')]),
  message: z
    .string()
    .min(1, { message: 'Pole jest wymagane' })
    .max(100, { message: 'Wiadomość może mieć maksymalnie 100 znaków' }),
});

export type GiftCardSchema = z.infer<typeof giftCardSchema>;
