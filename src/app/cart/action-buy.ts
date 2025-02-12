'use server';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Stripe } from 'stripe';
import { z } from 'zod';
import { EXTERNAL_ID_COOKIE } from '@/app/(main-layout)/generate/_utils/common';

import { sendInitCheckoutPixelEvent } from '@/app/_utils/pixel-events';
import { CanvasSize } from '@/app/_utils/sizes-utils';
import { checkIsGiftCodeCouponName } from '@/app/api/check-promo/utils';
import { CartItem, cartItemSchema } from './utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const actionBuy = async ({
  cancelUrl,
  cartItems,
  promoCodeId,
}: {
  cancelUrl: string;
  cartItems: CartItem[];
  promoCodeId?: string;
}) => {
  const parsedCartItems = z.array(cartItemSchema).parse(cartItems);

  const headersList = headers();
  const cookieStore = cookies();
  let externalId = cookieStore.get('external_id')?.value;

  // GIFT CARD LOGIC SAME ON FRONTEND AND BACKEND
  if (promoCodeId) {
    const promotionCode = await stripe.promotionCodes.retrieve(promoCodeId);

    if (checkIsGiftCodeCouponName(promotionCode.coupon.name)) {
      if (cartItems.length !== 1) {
        throw new Error('Only one item can be bought with a gift code');
      }

      if (cartItems[0].quantity !== 1) {
        throw new Error('Only one item can be bought with a gift code, with one quantity');
      }

      if (cartItems[0].canvasSize !== promotionCode.coupon.name.split('GIFT')[1]) {
        throw new Error('Gift code size does not match the item size');
      }
    }
  }

  if (!externalId) {
    externalId = crypto.randomUUID();
    cookieStore.set(EXTERNAL_ID_COOKIE, externalId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'strict',
      secure: true,
    });
  }

  if (process.env.SHOULD_SEND_PIXEL_EVENTS !== 'false') {
    await sendInitCheckoutPixelEvent();
  }
  const itemBySize = parsedCartItems.reduce(
    (acc, item) => {
      const key = `${item.canvasSize}_${item.type}`;
      if (!acc[key]) {
        acc[key] = { quantity: 0, size: item.canvasSize, type: item.type };
      }

      acc[key].quantity += item.quantity;

      return acc;
    },
    {} as Record<string, { quantity: number; size: CanvasSize; type: 'square' | 'portrait' }>,
  );

  const metadata = parsedCartItems.reduce((acc: Record<string, string>, item) => {
    acc[item.id] = JSON.stringify({
      imageId: item.imageId,
      quantity: item.quantity,
      size: item.canvasSize,
      type: item.type,
    });

    return acc;
  }, {});

  const session = await stripe.checkout.sessions.create({
    line_items: Object.values(itemBySize).map(({ size, quantity, type }) => {
      const priceId = process.env[`STRIPE_PRICE_ID_${size}_${type.toUpperCase()}`];
      if (!priceId) throw new Error('Price ID does not exist');

      return { price: priceId, quantity };
    }),
    shipping_options: [{ shipping_rate: process.env.STRIPE_SHIPPING_RATE_ID }],
    mode: 'payment',
    success_url: `${headersList.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    payment_intent_data: { metadata },
    phone_number_collection: { enabled: true },
    invoice_creation: {
      enabled: true,
      invoice_data: {
        account_tax_ids: [process.env.INVOICE_TAX_ID!],
        custom_fields: [
          { name: 'Nazwa sprzedawcy', value: 'Cratun sp. z o.o.' },
          { name: 'Adres sprzedawcy', value: 'Niekłonice 49E 76-024' },
        ],
      },
    },
    metadata,
    discounts: promoCodeId ? [{ promotion_code: promoCodeId }] : undefined,
    automatic_tax: { enabled: true },
    billing_address_collection: 'required',
    shipping_address_collection: { allowed_countries: ['PL'] },
    tax_id_collection: { enabled: true },
    locale: 'pl',
    consent_collection: {
      terms_of_service: 'required',
    },
    custom_text: {
      terms_of_service_acceptance: {
        message: `Akceptuję warunki [regulaminu](${headersList.get('origin')}/terms-of-service).`,
      },
    },
  });

  if (!session.url) {
    throw new Error('No session URL found');
  }

  redirect(session.url);
};

export default actionBuy;
