export const canvasSizes = ['30', '60', '100'] as const;
export type CanvasSize = (typeof canvasSizes)[number];

export const defaultCanvasSize: CanvasSize = '60';
