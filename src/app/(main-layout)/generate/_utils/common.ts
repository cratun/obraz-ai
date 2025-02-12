export const GENERATION_TOKEN_COUNT_COOKIE = 'jyAf615-ENvbLs4q6ltHR';
export const GENERATION_TOKEN_DAILY_LIMIT = 20;
export const GENERATION_TOKEN_RETENTION_HOURS = 24;
export const GENERATION_TOKEN_LIMIT_REACHED = 'GENERATION_TOKEN_LIMIT_REACHED';
export const EXTERNAL_ID_COOKIE = 'external_id';

export const IMAGE_HISTORY_COOKIE = '4aHWRtn_PhQKo4YZ38iKZa';
// 387, y: 157
export const mockupData = [
  {
    imageName: '1',
    positions: {
      S: { x: 477, y: 287 },
      M: { x: 417, y: 177 },
      L: { x: 327, y: 137 },
    },
  },
  {
    imageName: '2',
    positions: {
      S: { x: 383, y: 266 },
      M: { x: 323, y: 156 },
      L: { x: 233, y: 116 },
    },
  },
  {
    imageName: '3',
    positions: {
      S: { x: 674, y: 325 },
      M: { x: 614, y: 215 },
      L: { x: 524, y: 155 },
    },
  },
] as const;

export const desiredMockupImageSizes = {
  S: 120,
  M: 240,
  L: 400,
} as const;

// KEEP IN SYNC WITH ENVS
export const sizeToPrice = {
  square: {
    S: 159,
    M: 209,
    L: 299,
  },
  portrait: {
    S: 169,
    M: 249,
    L: 359,
  },
};
