import { z } from 'zod';

const ImageHistoryEntrySchema = z.object({
  id: z.string(),
  timestamp: z.number(),
});

export const ImageHistorySchema = z.array(ImageHistoryEntrySchema);

export type ImageHistoryEntry = z.infer<typeof ImageHistoryEntrySchema>;

export const IMAGE_HISTORY_MAX_ENTRIES = 40;
