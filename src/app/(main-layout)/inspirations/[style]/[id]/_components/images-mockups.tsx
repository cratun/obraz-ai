'use client';

import { useEffect } from 'react';
import GeneratedImageSlider from '@/app/(main-layout)/generate/_components/generated-image-slider';
import useGenerateMocks from '@/app/_utils/use-generate-mocks';

const ImagesMockups = ({ generatedImgSrc, initialImageSrc }: { generatedImgSrc: string; initialImageSrc?: string }) => {
  const { generateMockupUrl, mockupImages } = useGenerateMocks();

  useEffect(() => {
    generateMockupUrl(generatedImgSrc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatedImgSrc]);

  return (
    <GeneratedImageSlider
      className="[--swiper-theme-color:theme(colors.primary)]"
      generatedImgSrc={generatedImgSrc}
      initialImageClassName={initialImageSrc ? '!p-0' : undefined}
      initialImageSrc={initialImageSrc}
      mockupImages={mockupImages}
    />
  );
};

export default ImagesMockups;
