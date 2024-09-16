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
        price: 'price_1PzlJELXa7qieokpMmj0Vx1g',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${headersList.get('origin')}/success`,
    cancel_url: cancelUrl,
    payment_intent_data: {
      metadata,
    },
    billing_address_collection: 'required',
    shipping_address_collection: { allowed_countries: ['PL'] },
    tax_id_collection: { enabled: true },
  });

  if (!session.url) {
    throw new Error();
  }

  redirect(session.url);
};

export default actionBuy;
