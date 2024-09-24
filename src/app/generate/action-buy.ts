'use server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Stripe } from 'stripe';
import { CheckoutMetadata } from '@/app/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const actionBuy = async ({ cancelUrl, metadata }: { cancelUrl: string; metadata: CheckoutMetadata }) => {
  const headersList = headers();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${headersList.get('origin')}/success`,
    cancel_url: cancelUrl,
    payment_intent_data: {
      metadata,
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
    automatic_tax: { enabled: true },
    billing_address_collection: 'required',
    shipping_address_collection: { allowed_countries: ['PL'] },
    tax_id_collection: { enabled: true },
    locale: 'pl',
  });

  if (!session.url) {
    throw new Error();
  }

  redirect(session.url);
};

export default actionBuy;
