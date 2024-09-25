import dayjs from 'dayjs';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import Stripe from 'stripe';
import OrderEmail from '@/emails/order-email';

const secret = process.env.STRIPE_WEBHOOK_SECRET!;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const signature = headers().get('stripe-signature');

  if (!signature) throw new Error();

  let event;

  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Webhook Error: ${error.message}`,
        ok: false,
      },
      { status: 400 },
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    if (!session.customer_details) {
      throw new Error('No customer details found');
    }

    if (!session.amount_total) {
      throw new Error('No amount total found');
    }

    if (!session.metadata || !session.metadata.imageId) {
      throw new Error('No image ID or metadata found');
    }

    await resend.emails.send({
      from: 'ObrazAI <kontakt@obraz-ai.com>',
      to: [session.customer_details.email as string],
      subject: 'ObrazAI - Potwierdzenie Twojego zamówienia',
      react: (
        <OrderEmail
          imageId={session.metadata.imageId}
          orderDate={dayjs.unix(session.created).format('DD.MM.YYYY HH:mm')}
          orderNumber={`${session.payment_intent}`}
          price={`${session.amount_total / 100} PLN`}
          userName={`${session.customer_details.name?.split(' ')[0]}`}
        />
      ),
    });
  }

  return NextResponse.json({ result: event, ok: true });
}
