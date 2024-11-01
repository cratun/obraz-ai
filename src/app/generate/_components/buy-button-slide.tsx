'use client';

import { useEffect, useRef, useState } from 'react';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Slide from '@mui/material/Slide';
import { useIntersectionObserver } from 'usehooks-ts';
import AppButton from '@/app/_components/app-button';

export const useSlideInOnScrollDown = () => {
  const [slideIn, setSlideIn] = useState(false);
  const prevScrollY = useRef(0); // Initialize to 0 to avoid accessing window during SSR

  const scrollDirection = useRef<'down' | 'up' | null>(null);

  useEffect(() => {
    // Initialize prevScrollY.current on the client
    prevScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY.current) {
        scrollDirection.current = 'down';
      } else if (currentScrollY < prevScrollY.current) {
        scrollDirection.current = 'up';
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use Intersection Observer
  const { ref } = useIntersectionObserver({
    threshold: 0.5,
    onChange: (isIntersecting) => {
      // Ensure scrollDirection.current is not null
      if (!scrollDirection.current) return;

      if (!isIntersecting && scrollDirection.current === 'down') {
        setSlideIn(true);
      } else if (isIntersecting && scrollDirection.current === 'up') {
        setSlideIn(false);
      }
    },
  });

  return { ref, slideIn };
};

const BuyButtonSlide = ({
  slideIn,
  disabled,
  isVisible,
  onClick,
}: {
  slideIn: boolean;
  isVisible: boolean;
  disabled: boolean;
  onClick: () => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <Slide mountOnEnter unmountOnExit direction="up" in={slideIn}>
      <div className="fixed bottom-0 left-0 right-0 z-10 flex flex-col gap-2 border border-t border-text/20 bg-white px-5 py-4 md:hidden">
        <AppButton
          className="py-3"
          color="accent"
          disabled={disabled}
          size="large"
          startIcon={<ShoppingCartRoundedIcon />}
          variant="contained"
          onClick={onClick}
        >
          Kup teraz
        </AppButton>
        <div className="flex items-center gap-1 text-xs font-bold text-text">
          <AccessTimeRoundedIcon className="text-base" /> <span>Czas dostawy: 3 - 5 dni roboczych</span>{' '}
        </div>
      </div>
    </Slide>
  );
};
export default BuyButtonSlide;
