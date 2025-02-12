import { z } from 'zod';

const ImageHistoryEntrySchema = z.object({
  id: z.string(),
  timestamp: z.number(),
  type: z.enum(['portrait', 'square']),
});

export const ImageHistorySchema = z.array(ImageHistoryEntrySchema);

export type ImageHistoryEntry = z.infer<typeof ImageHistoryEntrySchema>;

export const IMAGE_HISTORY_MAX_ENTRIES = 40;

export const IMAGE_HISTORY_EXPIRY_DAYS = 14;
