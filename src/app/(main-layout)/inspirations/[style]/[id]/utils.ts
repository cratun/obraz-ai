'use client';
import { shuffle } from 'remeda';
import { useWindowSize } from 'usehooks-ts';
import { inspirationData } from '@/app/(main-layout)/inspirations/utils';
import { GenerationStyle } from '@/app/_utils/constants';

const useRandomInspirations = (style: GenerationStyle, id: string) => {
  const width = useWindowSize().width;
  const shuffledArray = shuffle(inspirationData.filter((el) => el.style === style && el.id !== id));

  if (!width) return;

  if (width >= 1024) {
    shuffledArray.length = 5;

    return shuffledArray;
  }

  if (width >= 768) {
    shuffledArray.length = 4;

    return shuffledArray;
  }

  if (width >= 640) {
    shuffledArray.length = 3;

    return shuffledArray;
  }

  shuffledArray.length = 2;

  return shuffledArray;
};

export default useRandomInspirations;
