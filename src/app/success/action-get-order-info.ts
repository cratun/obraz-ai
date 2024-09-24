'use server';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const actionGetOrderInfo = async (sessionId: string) => {
  let customer;
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (typeof session.customer === 'string') {
    customer = await stripe.customers.retrieve(session.customer);
  }

  return { session, customer: customer as Stripe.Customer };
};

export default actionGetOrderInfo;
