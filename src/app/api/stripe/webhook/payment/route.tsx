import dayjs from 'dayjs';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import Stripe from 'stripe';
import { giftCardSchema } from '@/app/(main-layout)/giftcard/utils';
import GiftCardEmail from '@/emails/gift-card-email';
import GiftCardSentEmail from '@/emails/gift-card-sent-email';
import OrderEmail from '@/emails/order-email';
import { generateGiftCardPdf } from './utils';

const secret = process.env.STRIPE_WEBHOOK_SECRET!;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

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

    if (session.amount_total === null) {
      throw new Error('No amount total found');
    }

    if (session.metadata?.isGiftCard === 'true') {
      // GIFT CARD LOGIC

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { isGiftCard, ...payload } = session.metadata;
      const giftCardPayload = giftCardSchema.parse(payload);
      const expiresAtDate = dayjs().add(1, 'year');

      const couponId = process.env[`STRIPE_GIT_CARD_COUPON_ID_${payload.canvasSize}`];

      if (!couponId) {
        throw new Error('No coupon ID found' + JSON.stringify(payload));
      }

      const { code } = await stripe.promotionCodes.create({
        coupon: couponId,
        expires_at: expiresAtDate.unix(),
        max_redemptions: 1,
      });

      const expirationDateFormatted = expiresAtDate.format('DD.MM.YYYY');
      // Generate the PDF
      const filledPdfBytes = await generateGiftCardPdf(giftCardPayload, expirationDateFormatted, code);

      // Encode the PDF to Base64
      const pdfBase64 = Buffer.from(filledPdfBytes).toString('base64');

      const pdfGiftCardAttachment = [
        {
          content: pdfBase64,
          filename: 'Karta podarunkowa ObrazAI.pdf',
          contentType: 'application/pdf',
        },
      ];

      await resend.emails.send({
        from: 'ObrazAI <kontakt@obraz-ai.com>',
        to: [session.customer_details.email as string],
        subject: `ObrazAI | Karta podarunkowa na ObrazAI o rozmiarze ${giftCardPayload.canvasSize} została wysłana!`,
        react: (
          <GiftCardSentEmail
            canvasSize={giftCardPayload.canvasSize}
            giverName={giftCardPayload.recipientName}
            recipientEmail={giftCardPayload.recipientEmail}
            recipientName={giftCardPayload.giverName}
          />
        ),
        attachments: pdfGiftCardAttachment,
      });

      await resend.emails.send({
        from: 'ObrazAI <kontakt@obraz-ai.com>',
        to: [giftCardPayload.recipientEmail],
        subject: `ObrazAI | Cześć ${giftCardPayload.recipientName}, ${giftCardPayload.giverName} przekazuje Ci kartę podarunkową!`,
        react: (
          <GiftCardEmail
            canvasSize={giftCardPayload.canvasSize}
            expirationDate={expirationDateFormatted}
            message={giftCardPayload.message}
            promoCode={code}
            receiverName={giftCardPayload.recipientName}
            senderName={giftCardPayload.giverName}
          />
        ),
        attachments: pdfGiftCardAttachment,
      });

      return NextResponse.json({ result: event, ok: true });
    }

    if (!session.shipping_details) {
      throw new Error('No shipping details found');
    }

    await resend.emails.send({
      from: 'ObrazAI <kontakt@obraz-ai.com>',
      to: [session.customer_details.email as string],
      bcc: process.env.NODE_ENV !== 'development' ? 'obraz.ai+e438967749@invite.trustpilot.com' : undefined,
      subject: 'ObrazAI - Potwierdzenie Twojego zamówienia',
      react: (
        <OrderEmail
          orderDate={dayjs.unix(session.created).format('DD.MM.YYYY HH:mm')}
          orderNumber={`${session.payment_intent || session.id}`}
          price={`${session.amount_total / 100} zł`}
          shippingDetails={session.shipping_details}
          userName={`${session.customer_details.name?.split(' ')[0]}`}
        />
      ),
    });
  }

  return NextResponse.json({ result: event, ok: true });
}
