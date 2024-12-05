'use client';

import { useState } from 'react';
import { desiredMockupImageSizes, mockupData } from '@/app/(main-layout)/generate/_utils/common';
import generateMockup from '@/app/(main-layout)/generate/buy/generate-mockup';
import { MockupImages } from '@/app/types';
import { CanvasSize } from './sizes-utils';

const useGenerateMocks = () => {
  const [mockupImages, setMockupImages] = useState<MockupImages | null>(null);

  const generateMockupUrl = async (imgSrc: string) => {
    const sizeEntries = Object.entries(desiredMockupImageSizes);
    const allMockupImages: MockupImages = {};

    for (const [sizeKey, maxUserImageSize] of sizeEntries) {
      const promises = mockupData.map((el) => {
        return generateMockup(
          `/mocks/${el.imageName}.png`,
          imgSrc,
          el.positions[sizeKey as CanvasSize],
          maxUserImageSize,
        );
      });

      const images = await Promise.all(promises);
      allMockupImages[sizeKey] = images;
    }

    setMockupImages(allMockupImages);
  };

  return { generateMockupUrl, mockupImages };
};

export default useGenerateMocks;
