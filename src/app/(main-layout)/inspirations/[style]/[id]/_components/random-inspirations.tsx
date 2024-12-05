'use client';

import useRandomInspirations from '@/app/(main-layout)/inspirations/[style]/[id]/utils';
import InspirationCard from '@/app/(main-layout)/inspirations/_components/inspiration-card';
import { GenerationStyle } from '@/app/_utils/constants';

const RandomInspirations = ({ style, id }: { style: GenerationStyle; id: string }) => {
  const randomInspiration = useRandomInspirations(style, id);

  if (!randomInspiration) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {randomInspiration.map((item) => {
        return <InspirationCard key={item.id} id={item.id} prompt={item.prompt} style={item.style} />;
      })}
    </div>
  );
};

export default RandomInspirations;
