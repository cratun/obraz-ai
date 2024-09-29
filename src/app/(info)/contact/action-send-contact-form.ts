'use server';

import { Resend } from 'resend';
import { CONTACT_EMAIL } from '@/app/_utils/constants';

const resend = new Resend(process.env.RESEND_API_KEY!);

const actionSendContactForm = async ({ email, message }: { email: string; message: string }) => {
  await resend.emails.send({
    from: `ObrazAI <${CONTACT_EMAIL}>`,
    to: CONTACT_EMAIL,
    subject: 'Formularz kontaktowy',
    html: `<p>Email: ${email}<br/>Wiadomość: ${message}</p>`,
  });
};

export default actionSendContactForm;
