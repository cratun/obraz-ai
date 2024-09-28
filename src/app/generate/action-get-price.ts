'use server';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const actionGetPrice = async () => {
  const price = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID!);

  if (!price.unit_amount) {
    throw new Error('No price.unit_amount found');
  }

  return price.unit_amount;
};

export default actionGetPrice;
