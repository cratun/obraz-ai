export const GENERATION_TOKEN_COUNT_COOKIE = 'jyAf615-ENvbLs4q6ltHR';
export const GENERATION_TOKEN_DAILY_LIMIT = 40;
export const GENERATION_TOKEN_RETENTION_HOURS = 24;
export const GENERATION_TOKEN_LIMIT_REACHED = 'GENERATION_TOKEN_LIMIT_REACHED';
export const EXTERNAL_ID_COOKIE = 'external_id';

export const IMAGE_HISTORY_COOKIE = '4aHWRtn_PhQKo4YZ38iKZ';
// 387, y: 157
export const mockupData = [
  {
    imageName: '1',
    positions: {
      30: { x: 477, y: 287 },
      60: { x: 417, y: 177 },
      100: { x: 327, y: 137 },
    },
  },
  {
    imageName: '2',
    positions: {
      30: { x: 383, y: 266 },
      60: { x: 323, y: 156 },
      100: { x: 233, y: 116 },
    },
  },
  {
    imageName: '3',
    positions: {
      30: { x: 674, y: 325 },
      60: { x: 614, y: 215 },
      100: { x: 524, y: 155 },
    },
  },
] as const;

export const desiredMockupImageSizes = {
  30: 120,
  60: 240,
  100: 400,
} as const;

// KEEP IN SYNC WITH ENVS
export const sizeToPrice = {
  '30': 89,
  '60': 129,
  '100': 219,
};
