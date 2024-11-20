'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Stripe } from 'stripe';
import { sendInitCheckoutPixelEvent } from '@/app/_utils/pixel-events';
import { GiftCardSchema, giftCardSchema } from './utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const actionBuyGiftCard = async ({ body, cancelUrl }: { cancelUrl: string; body: GiftCardSchema }) => {
  const payload = giftCardSchema.parse(body);

  const headersList = headers();

  if (process.env.SHOULD_SEND_PIXEL_EVENTS !== 'false') {
    await sendInitCheckoutPixelEvent();
  }

  const metadata = { ...payload, isGiftCard: 'true' };

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: process.env[`STRIPE_GIFT_CARD_PRICE_ID_${payload.canvasSize}`], quantity: 1 }],
    mode: 'payment',
    success_url: `${headersList.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    metadata,
    payment_intent_data: { metadata },
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
    automatic_tax: { enabled: true },
    tax_id_collection: { enabled: true },
    locale: 'pl',
    consent_collection: { terms_of_service: 'required' },
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

export default actionBuyGiftCard;
