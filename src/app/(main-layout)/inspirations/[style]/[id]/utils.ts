'use client';
import { useRef } from 'react';
import { shuffle } from 'remeda';
import { useWindowSize } from 'usehooks-ts';
import { inspirationData, InspirationStyle } from '@/app/(main-layout)/inspirations/utils';

const useRandomInspirations = (style: InspirationStyle, id: string) => {
  const { width } = useWindowSize();
  const shuffledArrayRef = useRef<typeof inspirationData | undefined>();

  if (!shuffledArrayRef.current) {
    const filtered = shuffle(inspirationData.filter((el) => el.style === style && el.id !== id));

    if (!width) {
      shuffledArrayRef.current = undefined;
    } else if (width >= 1024) {
      filtered.length = 5;
      shuffledArrayRef.current = filtered;
    } else if (width >= 768) {
      filtered.length = 4;
      shuffledArrayRef.current = filtered;
    } else if (width >= 640) {
      filtered.length = 3;
      shuffledArrayRef.current = filtered;
    } else {
      filtered.length = 2;
      shuffledArrayRef.current = filtered;
    }
  }

  return shuffledArrayRef.current;
};

export default useRandomInspirations;
