export const canvasSizes = ['30', '60', '100'] as const;
export type CanvasSize = (typeof canvasSizes)[number];

export const defaultCanvasSize: CanvasSize = '60';

const checkIsCanvasSize = (size: any): size is CanvasSize => canvasSizes.includes(size);

export const getCanvasSizeFromQueryParam = (size: string | null): CanvasSize =>
  checkIsCanvasSize(size) ? size : defaultCanvasSize;
