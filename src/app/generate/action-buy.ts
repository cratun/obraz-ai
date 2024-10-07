'use server';
import dayjs from 'dayjs';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Stripe } from 'stripe';
import { getClientIp } from '@/app/_utils/get-client-ip';
import { CheckoutMetadata } from '@/app/types';
import { EXTERNAL_ID_COOKIE } from './_utils/common';

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
  // .setTestEventCode('TEST53533');

  await eventRequest.execute().then(
    (response: any) => {
      console.log('Response: ', response);
    },
    (err: any) => {
      console.error('Error: ', err);
    },
  );
};

const actionBuy = async ({ cancelUrl, metadata }: { cancelUrl: string; metadata: CheckoutMetadata }) => {
  const headersList = headers();
  const cookiesList = cookies();
  let externalId = cookiesList.get('external_id')?.value;

  if (!externalId) {
    externalId = crypto.randomUUID();
    cookiesList.set(EXTERNAL_ID_COOKIE, externalId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'strict',
      secure: true,
    });
  }

  if (process.env.NODE_ENV !== 'development') {
    await sendInitCheckoutPixelEvent();
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${headersList.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    payment_intent_data: {
      metadata,
    },
    phone_number_collection: {
      enabled: true,
    },
    metadata,
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
    allow_promotion_codes: true,
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
        message: `Zapoznałem się i akceptuję warunki [regulaminu](${headersList.get('origin')}/terms-of-service) oraz zgadzam się na wykonanie zamówienia zgodnie z moimi specyfikacjami i zrzekam się prawa do odstąpienia od umowy.`,
      },
    },
  });

  if (!session.url) {
    throw new Error('No session URL found');
  }

  redirect(session.url);
};

export default actionBuy;
