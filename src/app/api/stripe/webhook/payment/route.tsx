import dayjs from 'dayjs';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import Stripe from 'stripe';
import { META_ACCESS_TOKEN, PIXEL_ID } from '@/app/_utils/common-server';
import { getClientIp } from '@/app/_utils/get-client-ip';
import OrderEmail from '@/emails/order-email';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const bizSdk = require('facebook-nodejs-business-sdk');

const secret = process.env.STRIPE_WEBHOOK_SECRET!;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

const sendPixelEvent = async ({ email, phone, amount }: { email: string; phone: string; amount: number }) => {
  const headersList = headers();
  const access_token = META_ACCESS_TOKEN;
  bizSdk.FacebookAdsApi.init(access_token);
  const EventRequest = bizSdk.EventRequest;
  const UserData = bizSdk.UserData;
  const ServerEvent = bizSdk.ServerEvent;
  const CustomData = bizSdk.CustomData;

  const pixel_id = PIXEL_ID;

  const userData = new UserData()
    .setEmails([email])
    .setPhones([phone])
    .setClientIpAddress(getClientIp())
    .setClientUserAgent(headersList.get('user-agent') || '');

  const customData = new CustomData().setCurrency('PLN').setValue(amount);

  const serverEvent = new ServerEvent()
    .setEventName('Purchase')
    .setEventTime(dayjs().unix())
    .setUserData(userData)
    .setCustomData(customData)
    .setActionSource('website');
  // TODO: add more data to the event
  const eventsData = [serverEvent];
  const eventRequest = new EventRequest(access_token, pixel_id).setEvents(eventsData);
  // .setTestEventCode('TEST95528');

  await eventRequest.execute().then(
    (response: any) => {
      console.log('Response: ', response);
    },
    (err: any) => {
      console.error('Error: ', err);
    },
  );
};

export async function POST(req: Request) {
  const headersList = headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) throw new Error('No stripe-signature found');

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

    await sendPixelEvent({
      email: session.customer_details.email as string,
      phone: session.customer_details.phone as string,
      amount: session.amount_total / 100,
    });

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
