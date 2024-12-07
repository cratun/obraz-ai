'use client';
import { useEffect, useRef, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { useToggle } from 'usehooks-ts';
import AppButton from '@/app/_components/app-button';

const Prompt = ({ prompt }: { prompt: string }) => {
  const visibleRef = useRef<HTMLDivElement>(null);
  const [isClamped, setIsClamped] = useState(false);
  const [isExpanded, toggleIsExpanded] = useToggle(false);

  useEffect(() => {
    const visibleElement = visibleRef.current;

    if (visibleElement) {
      // Create a clone of the content
      const clone = visibleElement.cloneNode(true) as HTMLDivElement;

      // Apply styles to make the clone invisible and ensure it doesn't affect layout
      clone.style.position = 'absolute';
      clone.style.visibility = 'hidden';
      clone.style.height = 'auto';
      clone.style.maxHeight = 'none';
      clone.style.overflow = 'visible';

      // Set the clone's width to match the visible element's width
      const visibleRect = visibleElement.getBoundingClientRect();
      clone.style.width = `${visibleRect.width}px`;

      // Append clone to the body to measure full height
      document.body.appendChild(clone);
      const fullHeight = clone.scrollHeight;

      // Measure the visible container height
      const clampedHeight = visibleElement.clientHeight;

      // Remove the clone after measurement
      document.body.removeChild(clone);

      // Set clamping state
      setIsClamped(fullHeight > clampedHeight);
    }
  }, [prompt]);

  return (
    <div className="flex flex-col gap-2.5">
      <div
        ref={visibleRef}
        className={twJoin('text-base leading-[1.5] tracking-[0.5px] md:text-xl', !isExpanded ? 'line-clamp-3' : '')}
      >
        &quot;{prompt}&quot;
      </div>
      {isClamped && (
        <AppButton className="w-fit p-0" size="small" variant="text" onClick={toggleIsExpanded}>
          Czytaj {isExpanded ? 'mniej...' : 'więcej...'}
        </AppButton>
      )}
    </div>
  );
};

export default Prompt;
