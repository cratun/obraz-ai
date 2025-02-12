import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { GiftCardSchema } from '@/app/(main-layout)/giftcard/utils';
import { generateGiftCardPdf } from '@/app/api/stripe/webhook/payment/utils';

const resend = new Resend(process.env.RESEND_API_KEY!);

export const POST = async () => {
  // Define the gift card details
  const giftCardPayload: GiftCardSchema = {
    recipientName: 'John Doe',
    giverName: 'Jane Smith',
    recipientEmail: '',
    message: 'Happy Birthday!',
    canvasSize: 'M',
  };

  const expirationDate = '2024-12-31';
  const giftCode = 'ABC123';

  // Generate the PDF
  const filledPdfBytes = await generateGiftCardPdf(giftCardPayload, expirationDate, giftCode);

  // Encode the PDF to Base64
  const pdfBase64 = Buffer.from(filledPdfBytes).toString('base64');

  // Send the email with the PDF attachment
  await resend.emails.send({
    from: 'ObrazAI <kontakt@obraz-ai.com>',
    to: 'cratun.dev@gmail.com',
    subject: 'Your Gift Card',
    html: '<p>Please find attached your gift card.</p>',
    attachments: [
      {
        content: pdfBase64,
        filename: 'Karta podarunkowa ObrazAI.pdf',
        contentType: 'application/pdf',
      },
    ],
  });

  return NextResponse.json({ ok: true });
};
