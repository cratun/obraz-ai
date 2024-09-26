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
    success_url: `${headersList.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    payment_intent_data: {
      metadata,
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
    throw new Error();
  }

  redirect(session.url);
};

export default actionBuy;
