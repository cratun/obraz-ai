'use client';

import { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton, Slide } from '@mui/material';

const ScrollToTopButton = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Slide mountOnEnter unmountOnExit direction="up" in={scrollY > 300}>
      <IconButton
        className="fixed bottom-5 right-5 z-20 bg-primary"
        onClick={() => scrollTo({ left: 0, top: 0, behavior: 'smooth' })}
      >
        <KeyboardArrowUpIcon className="text-white" />
      </IconButton>
    </Slide>
  );
};

export default ScrollToTopButton;
