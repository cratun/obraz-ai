'use client';

import { useEffect } from 'react';
import GeneratedImageSlider from '@/app/(main-layout)/generate/_components/generated-image-slider';
import useGenerateMocks from '@/app/_utils/use-generate-mocks';

const ImagesMockups = ({ imgSrc }: { imgSrc: string }) => {
  const { generateMockupUrl, mockupImages } = useGenerateMocks();

  useEffect(() => {
    generateMockupUrl(imgSrc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgSrc]);

  return (
    <GeneratedImageSlider
      className="[--swiper-theme-color:theme(colors.primary)]"
      generatedImgSrc={imgSrc}
      mockupImages={mockupImages}
    />
  );
};

export default ImagesMockups;
