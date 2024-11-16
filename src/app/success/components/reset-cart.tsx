'use client';

import { useEffect } from 'react';
import { useCartStorage } from '@/app/cart/components/add-to-cart-button';

const ResetCart = () => {
  const { clear } = useCartStorage();

  useEffect(() => {
    clear();
  }, [clear]);

  return null;
};

export default ResetCart;
