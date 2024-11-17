'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LoyaltyRoundedIcon from '@mui/icons-material/LoyaltyRounded';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import {
  Drawer,
  DrawerProps,
  IconButton,
  Skeleton,
  Slide,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { useMediaQuery } from 'usehooks-ts';
import { sizeToPrice } from '@/app/(main-layout)/generate/_utils/common';
import AppButton from '@/app/_components/app-button';
import PaymentMethodsList from '@/app/_components/payments-methods-list';
import Typography from '@/app/_components/typography';
import PromoBox from '@/app/_promo/promo-box';
import { SpecialPromoCookie } from '@/app/_promo/special-promo-cookie';
import { getBucketImgUrl, groszToPLN } from '@/app/_utils/common';
import { CanvasSize, canvasSizes } from '@/app/_utils/sizes-utils';
import { CheckPromoResponse } from '@/app/api/check-promo/utils';
import actionBuy from '@/app/cart/action-buy';
import { useCartStorage } from '@/app/cart/components/add-to-cart-button';
import { CartItem } from '@/app/cart/utils';

const FINALIZE_PAYMENT_TEXT = 'Sfinalizuj zakup';

const BuyButtonSlideCheckout = ({
  slideIn,
  disabled,
  isVisible,
  loading,
  onClick,
}: {
  slideIn: boolean;
  isVisible: boolean;
  disabled: boolean;
  loading: boolean;
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
      <div className="fixed bottom-0 left-0 right-0 z-10 flex flex-col gap-2 border border-t border-text/20 bg-white px-5 py-4 shadow-md md:hidden">
        <AppButton
          className="py-3.5 text-base"
          color="accent"
          disabled={disabled}
          loading={loading}
          size="large"
          variant="contained"
          onClick={onClick}
        >
          {FINALIZE_PAYMENT_TEXT}
        </AppButton>
        <div className="flex items-center gap-1 self-center text-xs font-semibold text-text">
          <AccessTimeRoundedIcon className="text-base" /> <span>Czas dostawy: 3 - 5 dni roboczych</span>{' '}
        </div>
      </div>
    </Slide>
  );
};

const EditCartItemDrawerContent = ({ item, onClose }: { item: CartItem; onClose: () => void }) => {
  const { updateItem } = useCartStorage();

  const form = useForm({
    defaultValues: { quantity: item.quantity, canvasSize: item.canvasSize },
  });

  const quantity = form.watch('quantity');
  const size = form.watch('canvasSize');

  return (
    <>
      <div className="flex items-center justify-between text-text">
        <div className="flex items-center gap-2.5 text-xl font-semibold leading-[120%] tracking-[1px]">
          Edytuj produkt
        </div>
        <IconButton className="text-text" onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </div>
      <div className="flex gap-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" height={145} src={getBucketImgUrl(item.imageId)} width={140} />
        <div className="flex grow flex-col justify-between">
          <div className="text-base font-semibold leading-[1.2] tracking-[1px]">ObrazAI</div>
          <div className="text-xl font-bold leading-[1.2] tracking-[1px]">
            {sizeToPrice[size]} zł {quantity > 1 && <span className="text-sm font-normal text-text/70">za sztukę</span>}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <strong>Ilość</strong>
        <div className="flex items-center gap-2.5">
          <IconButton
            className="border border-solid border-primary text-primary [&.Mui-disabled]:opacity-30"
            disabled={quantity === 1}
            onClick={() => form.setValue('quantity', quantity - 1, { shouldDirty: true })}
          >
            <RemoveRoundedIcon className="text-base" />
          </IconButton>
          <strong className="text-xl">{quantity}</strong>
          <IconButton
            className="border border-solid border-primary text-primary [&.Mui-disabled]:opacity-30"
            disabled={quantity === 99}
            onClick={() => form.setValue('quantity', quantity + 1, { shouldDirty: true })}
          >
            <AddRoundedIcon className="text-base" />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <strong>Rozmiar</strong>
        <ToggleButtonGroup
          exclusive
          className="max-w-96 gap-2.5"
          value={size}
          onChange={(_, newSize: CanvasSize) => {
            console.log(newSize);
            form.setValue('canvasSize', newSize, { shouldDirty: true });
          }}
        >
          {canvasSizes.map((size) => (
            <ToggleButton
              key={size}
              value={size}
              classes={{
                root: 'rounded-full py-1.5 px-2.5',
                selected: '!text-white !bg-primary',
                standard: 'text-text bg-white',
              }}
            >
              {size}x{size} cm
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <AppButton
        size="large"
        variant="contained"
        onClick={form.handleSubmit((values) => {
          updateItem(item.id, values);
          onClose();
        })}
      >
        Zapisz
      </AppButton>
    </>
  );
};

const priceWithPercentDiscount = (price: number, discount: number) => price - (price * discount) / 100;

const formatPrice = (price: number) =>
  price.toLocaleString('pl', { maximumFractionDigits: 2, minimumFractionDigits: 2 });

const EditCartItemDrawer = ({
  className,
  item,
  onClose,
  ...props
}: Omit<DrawerProps, 'onClose' | 'variant'> & {
  onClose: () => void;
  item: CartItem;
}) => {
  const isDesktop = useMediaQuery('(min-width:1024px)');

  return (
    <Drawer
      {...props}
      anchor={isDesktop ? 'right' : 'bottom'}
      classes={{ paper: 'p-5 gap-5 md:max-w-sm text-text' }}
      className={twMerge('z-[10001]', className)}
      variant="temporary"
      onClose={onClose}
    >
      <EditCartItemDrawerContent item={item} onClose={onClose} />
    </Drawer>
  );
};

const CartContent = ({ specialPromoCookie }: { specialPromoCookie: SpecialPromoCookie }) => {
  const { cartItems, removeItem, isLoading } = useCartStorage();
  const [isPromoClicked, setIsPromoClicked] = useState(false);
  const [editDialogState, setEditDialogState] = useState<{ open: boolean; item: CartItem | null }>({
    open: false,
    item: null,
  });

  const beginCheckoutMutation = useMutation({
    mutationFn: (promoCodeId?: string) =>
      actionBuy({ cancelUrl: window.location.origin + '/cart', cartItems, promoCodeId }),
    onMutate: () => {
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'begin_checkout' });
      }
    },
  });

  const promoCodeInputRef = useRef<HTMLInputElement | null>(null);

  const checkPromoCodeMutation = useMutation({
    mutationFn: (code: string) =>
      axios.get<CheckPromoResponse>(`/api/check-promo?code=${code}`).then(({ data }) => data),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError: (_: AxiosError<{ errorCode: 'PROMO_CODE_NOT_FOUND' | 'PROMO_CODE_NOT_ACTIVE' }>) => {},
  });

  const handleAddPromoClick = () => {
    if (checkPromoCodeMutation.isSuccess) {
      if (promoCodeInputRef.current) {
        promoCodeInputRef.current.value = '';
      }

      return checkPromoCodeMutation.reset();
    }

    if (!promoCodeInputRef.current?.value) {
      return;
    }
    checkPromoCodeMutation.mutate(promoCodeInputRef.current.value);
  };

  const total = cartItems.reduce((total, item) => total + sizeToPrice[item.canvasSize] * item.quantity, 0);

  const getTotalWithPromo = () => {
    if (checkPromoCodeMutation.isSuccess) {
      if (checkPromoCodeMutation.data.percentOff) {
        return priceWithPercentDiscount(total, checkPromoCodeMutation.data.percentOff);
      }

      if (checkPromoCodeMutation.data.amountOff) {
        return total - groszToPLN(checkPromoCodeMutation.data.amountOff);
      }
    }

    return total;
  };

  const totalWithPromo = getTotalWithPromo();

  if (isLoading) {
    return (
      <div>
        <div className="flex gap-2.5">
          <Skeleton height={140} variant="rectangular" width={140} />
          <div className="flex grow flex-col justify-between">
            <div className="relative flex flex-col gap-2.5">
              <div className="text-base font-semibold leading-[1.2] tracking-[1px]">ObrazAI</div>
              <div className="flex flex-col">
                <Skeleton height={20} variant="rectangular" width={45} />
                <Skeleton height={20} variant="rectangular" width={125} />
              </div>
              <Skeleton height={30} variant="rectangular" width={72} />
            </div>
            <Skeleton height={24} variant="rectangular" width={61} />
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && !isLoading) {
    return (
      <div className="grid grow place-items-center">
        <div className="flex max-w-[450px] flex-col justify-center gap-2.5 py-5 md:gap-5">
          <Typography.Body className="text-center text-xl">
            Wygląda na to, że Twój koszyk jest pusty. Stwórz swój <strong>ObrazAI</strong>!
          </Typography.Body>
          <div className="flex flex-col gap-2.5">
            <AppButton
              className="py-2.5"
              href="/generate"
              LinkComponent={Link}
              size="large"
              startIcon={<AutoAwesomeRoundedIcon />}
              variant="contained"
            >
              Stwórz swój obraz teraz
            </AppButton>
            <Typography.Body className="self-center">Lub</Typography.Body>
            <AppButton
              className="py-2.5"
              href="/gallery"
              LinkComponent={Link}
              size="large"
              startIcon={<PhotoLibraryRoundedIcon />}
              variant="outlined"
            >
              Przejdź do swojej galerii
            </AppButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Typography.H2>Twój koszyk</Typography.H2>
      <div className="flex flex-col gap-5 md:flex-row md:gap-10">
        <BuyButtonSlideCheckout
          slideIn
          disabled={beginCheckoutMutation.isPending || isLoading}
          isVisible={cartItems.length > 0}
          loading={beginCheckoutMutation.isPending || checkPromoCodeMutation.isPending}
          onClick={() => {
            beginCheckoutMutation.mutate(
              checkPromoCodeMutation.isSuccess ? checkPromoCodeMutation.data.promoCodeId : undefined,
            );
          }}
        />
        <EditCartItemDrawer
          item={editDialogState.item as CartItem}
          open={editDialogState.open}
          onClose={() => setEditDialogState((prevState) => ({ ...prevState, open: false }))}
        />
        <div className="flex grow flex-col gap-2.5">
          {cartItems.map((item) => (
            <Fragment key={item.id}>
              <div className="flex gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" height={140} src={getBucketImgUrl(item.imageId)} width={140} />
                <div className="flex grow flex-col justify-between">
                  <div className="relative flex flex-col gap-2.5">
                    <div className="text-base font-semibold leading-[1.2] tracking-[1px]">ObrazAI</div>
                    <IconButton className="absolute -top-2 right-0 text-text" onClick={() => removeItem(item.id)}>
                      <DeleteRoundedIcon className="text-xl" />
                    </IconButton>
                    <div className="flex flex-col">
                      <div className="text-sm">
                        Ilość: <span className="font-medium">{item.quantity}</span>
                      </div>
                      <div className="text-sm">
                        Rozmiar:{' '}
                        <span className="font-medium">
                          {item.canvasSize}x{item.canvasSize} cm
                        </span>
                      </div>
                    </div>
                    <AppButton
                      className="self-start"
                      size="small"
                      startIcon={<EditRoundedIcon className="text-sm" />}
                      onClick={() => setEditDialogState({ open: true, item })}
                    >
                      Edytuj
                    </AppButton>
                  </div>
                  <div className="flex gap-1">
                    {checkPromoCodeMutation.data?.percentOff && (
                      <span className={twMerge('text-xl font-bold leading-[1.2] tracking-[1px] text-accent')}>
                        {formatPrice(
                          priceWithPercentDiscount(
                            sizeToPrice[item.canvasSize] * item.quantity,
                            checkPromoCodeMutation.data.percentOff,
                          ),
                        )}{' '}
                        zł
                      </span>
                    )}
                    <span
                      className={twMerge(
                        'text-xl font-bold leading-[1.2] tracking-[1px]',
                        !!checkPromoCodeMutation.data?.percentOff && 'text-base line-through',
                      )}
                    >
                      {sizeToPrice[item.canvasSize] * item.quantity} zł
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-b border-text/20" />
            </Fragment>
          ))}
        </div>
        <div className="flex flex-col gap-3 md:min-w-[350px] md:gap-5 lg:min-w-[400px]">
          <div className="hidden md:flex">
            <Typography.H3>Szczegóły zamówienia</Typography.H3>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between gap-1">
              <div>Wartość produktów:</div>
              <div className="font-medium">{formatPrice(total)} zł</div>
            </div>
            <div className="flex justify-between gap-1">
              <div>Dostawa:</div>
              <div className="font-medium">0.00 zł</div>
            </div>
            {checkPromoCodeMutation.isSuccess && (
              <div className="flex justify-between gap-1">
                <div>
                  Zniżka{' '}
                  {checkPromoCodeMutation.data.percentOff
                    ? `${checkPromoCodeMutation.data.percentOff}%`
                    : groszToPLN(checkPromoCodeMutation.data.amountOff as number) + ' zł'}
                  :
                </div>
                {checkPromoCodeMutation.data?.percentOff && (
                  <div className="font-medium text-accent">
                    -{formatPrice(total - priceWithPercentDiscount(total, checkPromoCodeMutation.data.percentOff))} zł
                  </div>
                )}
                {checkPromoCodeMutation.data.amountOff && (
                  <div className="font-medium text-accent">-{checkPromoCodeMutation.data.amountOff / 100} zł</div>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-between gap-1 text-xl">
            <strong>Całość:</strong>
            <strong>{formatPrice(totalWithPromo)} zł</strong>
          </div>
          <PromoBox hidePrice specialPromoCookie={specialPromoCookie} />
          <div className="border-b border-text/20" />
          <div>
            {isPromoClicked ? (
              <div className="flex flex-col gap-1">
                <div className="grid grid-cols-[1fr_80px]">
                  <TextField
                    fullWidth
                    className="[&_.Mui-disabled]:font-bold [&_.Mui-focused_fieldset]:border-primary"
                    disabled={checkPromoCodeMutation.isSuccess}
                    inputRef={promoCodeInputRef}
                    label="Kod rabatowy"
                    size="small"
                    variant="outlined"
                    slotProps={{
                      inputLabel: {
                        classes: { root: 'text-sm' },
                      },
                      input: {
                        inputProps: { maxLength: 14 },
                        classes: { input: '', notchedOutline: 'rounded-l-xl rounded-r-none' },
                      },
                    }}
                  />
                  <AppButton
                    className="rounded-l-none rounded-r-xl"
                    loading={checkPromoCodeMutation.isPending}
                    variant="contained"
                    onClick={handleAddPromoClick}
                  >
                    {checkPromoCodeMutation.isSuccess ? 'Usuń' : 'Dodaj'}
                  </AppButton>
                </div>
                {checkPromoCodeMutation.error?.response?.data.errorCode === 'PROMO_CODE_NOT_FOUND' && (
                  <Typography.Body className="text-sm font-bold">Wprowadzony kod nie istnieje.</Typography.Body>
                )}
                {checkPromoCodeMutation.error?.response?.data.errorCode === 'PROMO_CODE_NOT_ACTIVE' && (
                  <Typography.Body className="text-sm font-bold">Wprowadzony kod wygasł.</Typography.Body>
                )}
                {/* TODO: Add code redeemed and other possible states */}
              </div>
            ) : (
              <AppButton
                fullWidth
                className="text-base font-bold"
                startIcon={<LoyaltyRoundedIcon />}
                onClick={() => setIsPromoClicked(true)}
              >
                Mam kod rabatowy
              </AppButton>
            )}
          </div>
          <div className="border-b border-text/20 md:hidden" />
          <PaymentMethodsList classes={{ container: 'md:hidden', iconContainer: 'h-7' }} />
          <AppButton
            className="hidden py-3 text-base md:flex"
            color="accent"
            disabled={beginCheckoutMutation.isPending || isLoading}
            loading={beginCheckoutMutation.isPending || checkPromoCodeMutation.isPending}
            size="large"
            variant="contained"
            onClick={() => {
              beginCheckoutMutation.mutate(
                checkPromoCodeMutation.isSuccess ? checkPromoCodeMutation.data.promoCodeId : undefined,
              );
            }}
          >
            {FINALIZE_PAYMENT_TEXT}
          </AppButton>
        </div>
      </div>
    </>
  );
};

export default CartContent;
