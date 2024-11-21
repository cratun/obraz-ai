'use client';

import { useCallback, useEffect, useState } from 'react';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Drawer, DrawerProps, IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { useLocalStorage } from 'usehooks-ts';
import { IMAGE_HISTORY_EXPIRY_DAYS } from '@/app/(main-layout)/generate/_utils/image-history/common';
import AppButton from '@/app/_components/app-button';
import { CanvasSize } from '@/app/_utils/sizes-utils';
import actionSendAddToCartEvent from '@/app/cart/action-send-add-to-cart-pixel-event';
import { CartItem } from '@/app/cart/utils';

const AddToCartDrawer = ({
  className,
  onClose,
  ...props
}: Omit<DrawerProps, 'onClose' | 'variant'> & { onClose: () => void }) => {
  const isDesktop = useMediaQuery('(min-width:1024px)');

  return (
    <Drawer
      {...props}
      anchor={isDesktop ? 'right' : 'bottom'}
      classes={{ paper: 'p-5 gap-5 lg:max-w-sm' }}
      className={twMerge('z-[10001]', className)}
      variant="temporary"
      onClose={onClose}
    >
      <div className="flex items-center justify-between text-text">
        <div className="flex items-center gap-2.5 text-lg font-semibold leading-[120%] tracking-[1px]">
          Obraz dodany do koszyka!
        </div>
        <IconButton className="text-text" onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </div>
      <div className="flex flex-col justify-between gap-2.5">
        <AppButton size="large" startIcon={<AutoAwesomeRoundedIcon />} variant="outlined" onClick={onClose}>
          Twórz dalej
        </AppButton>
        <AppButton
          color="accent"
          href="/cart"
          LinkComponent={Link}
          size="large"
          startIcon={<ShoppingCartRoundedIcon />}
          variant="contained"
        >
          Przejdź do koszyka
        </AppButton>
      </div>
    </Drawer>
  );
};

export const useCartStorage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useLocalStorage<Array<CartItem>>('cart', [], {
    initializeWithValue: false,
  });

  useEffect(() => {
    // loading state while hydrating
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Remove expired items from cart
    const now = dayjs();
    const expiryThreshold = now.subtract(IMAGE_HISTORY_EXPIRY_DAYS, 'day').unix();

    const validItems = cartItems.filter((entry) => entry.creationDateTimestamp > expiryThreshold);

    if (validItems.length !== cartItems.length) {
      // Update cartItems state if there are expired items
      setCartItems(validItems);
    }
  }, [cartItems, setCartItems]);

  const addItem = (imageId: string, canvasSize: CanvasSize, creationDateTimestamp: number) => {
    setCartItems((prevItems) => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.imageId === imageId && item.canvasSize === canvasSize,
      );

      if (existingItemIndex !== -1) {
        // Item exists, increment the quantity
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = { ...existingItem, quantity: existingItem.quantity + 1 };

        return updatedItems;
      } else {
        // Item does not exist, add a new entry with a unique ID
        const newItem: CartItem = {
          id: crypto.randomUUID(),
          imageId,
          quantity: 1,
          canvasSize,
          creationDateTimestamp,
        };

        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, updatedFields: Omit<Partial<CartItem>, 'id'>) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, ...updatedFields } : item)));
  };

  const clear = useCallback(() => setCartItems([]), [setCartItems]);

  return { addItem, removeItem, updateItem, clear, cartItems, isLoading };
};

export type CartItemData = Pick<CartItem, 'canvasSize' | 'imageId' | 'creationDateTimestamp'>;

const AddToCartButton = ({
  cartItemData,
  disabled,
  buttonRef,
}: {
  disabled?: boolean;
  cartItemData: CartItemData;
  buttonRef?: (node?: Element | null) => void;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { addItem } = useCartStorage();

  return (
    <>
      <AddToCartDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <AppButton
        ref={buttonRef}
        className="py-3 lg:py-5 lg:text-lg"
        color="accent"
        disabled={disabled}
        size="large"
        startIcon={<ShoppingCartRoundedIcon />}
        variant="contained"
        onClick={() => {
          addItem(cartItemData.imageId, cartItemData.canvasSize, cartItemData.creationDateTimestamp);
          setIsDrawerOpen(true);

          if (window.dataLayer) {
            window.dataLayer.push({ event: 'add_to_cart' });
          }
          actionSendAddToCartEvent();
        }}
      >
        Dodaj do koszyka
      </AppButton>
    </>
  );
};

export default AddToCartButton;
