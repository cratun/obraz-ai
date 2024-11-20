'server only';

import Stripe from 'stripe';
import { sendPixelPurchaseEvent } from '@/app/_utils/pixel-events';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const getOrderInfo = async (sessionId: string) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (!session.customer_details || !session.amount_total) throw new Error('No customer details found or amount total');

  if (process.env.SHOULD_SEND_PIXEL_EVENTS !== 'false') {
    await sendPixelPurchaseEvent({
      email: session.customer_details.email as string,
      phone: session.customer_details.phone as string,
      amount: session.amount_total / 100,
    });
  }
};

export default getOrderInfo;
