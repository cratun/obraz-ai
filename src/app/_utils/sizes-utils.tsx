export const canvasSizes = ['S', 'M', 'L'] as const;
export type CanvasSize = (typeof canvasSizes)[number];

export const defaultCanvasSize: CanvasSize = 'M';

const checkIsCanvasSize = (size: any): size is CanvasSize => canvasSizes.includes(size);

export const getCanvasSizeFromQueryParam = (size: string | null): CanvasSize =>
  checkIsCanvasSize(size) ? size : defaultCanvasSize;
