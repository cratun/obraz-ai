'use server';
import dayjs from 'dayjs';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Stripe } from 'stripe';
import { z } from 'zod';
import { ORIGIN_URL } from '@/app/_utils/constants';
import { getClientIp } from '@/app/_utils/get-client-ip';
import { EXTERNAL_ID_COOKIE } from '@/app/generate/_utils/common';
import { CartItem, cartItemSchema } from './utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PIXEL_ID = process.env.META_PIXEL_ID!;
const META_ACCESS_TOKEN = process.env.CONVERSIONS_API_ACCESS_TOKEN!;
// eslint-disable-next-line @typescript-eslint/no-require-imports
const bizSdk = require('facebook-nodejs-business-sdk');

const sendInitCheckoutPixelEvent = async () => {
  const headersList = headers();
  const cookiesList = cookies();

  const access_token = META_ACCESS_TOKEN;
  bizSdk.FacebookAdsApi.init(access_token);
  const EventRequest = bizSdk.EventRequest;
  const UserData = bizSdk.UserData;
  const ServerEvent = bizSdk.ServerEvent;

  const pixel_id = PIXEL_ID;

  const userData = new UserData()
    .setClientIpAddress(getClientIp())
    .setClientUserAgent(headersList.get('user-agent') || '')
    .setExternalId(cookiesList.get('external_id')?.value)
    .setFbp(cookiesList.get('_fbp')?.value)
    .setFbc(cookiesList.get('_fbc')?.value);

  const serverEvent = new ServerEvent()
    .setEventName('InitiateCheckout')
    .setEventTime(dayjs().unix())
    .setUserData(userData)
    .setActionSource('website');

  const eventsData = [serverEvent];
  const eventRequest = new EventRequest(access_token, pixel_id).setEvents(eventsData);
  // .setTestEventCode('TEST85816');

  await eventRequest.execute().then(
    (response: any) => {
      console.log('Response: ', response);
    },
    (err: any) => {
      console.error('Error: ', err);
    },
  );
};

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

  const lineItems = parsedCartItems.map((item) => {
    const size = item.canvasSize;
    const priceInGrosze = process.env[`CANVAS_PRICE_${size}`];
    if (!priceInGrosze) throw new Error('Invalid size');

    return {
      price_data: {
        currency: 'pln',
        product_data: {
          name: `ObrazAI na płótnie (${size}x${size}) cm`,
          images: [`${ORIGIN_URL}/api/resize-img?imgId=${item.imageId}`],
        },
        unit_amount: Number(priceInGrosze),
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [{ shipping_rate: process.env.STRIPE_SHIPPING_RATE_ID }],
    mode: 'payment',
    success_url: `${headersList.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    // NOTE: unlikely scenario, error will be thrown if items > 50
    payment_intent_data: {
      metadata: parsedCartItems.reduce((acc: Record<string, string>, item) => {
        acc[item.imageId] = JSON.stringify({ quantity: item.quantity, size: item.canvasSize });

        return acc;
      }, {}),
    },
    phone_number_collection: {
      enabled: true,
    },
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
