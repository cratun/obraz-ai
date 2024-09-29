'use server';

import { cookies } from 'next/headers';
import { IS_CAPTCHA_VERIFIED } from '@/app/generate/_utils/common';

interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  ['error-codes']?: string[];
}

const actionVerifyCaptcha = async (token: string) => {
  const cookieStore = cookies();
  const isVerified = cookieStore.get(IS_CAPTCHA_VERIFIED);
  if (isVerified?.value === 'true') return;

  const secretKey = process.env.RECAPTCHA_SECRET_KEY!;
  const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';

  const params = new URLSearchParams();
  params.append('secret', secretKey);
  params.append('response', token);

  try {
    const googleResponse = await fetch(verificationUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = (await googleResponse.json()) as RecaptchaResponse;

    if (data.success && data.score >= 0.5 && data.action === 'generate_image') {
      cookieStore.set(IS_CAPTCHA_VERIFIED, 'true', { maxAge: 60 * 60 * 24 });

      return;
    } else {
      // Verification failed
      cookieStore.set(IS_CAPTCHA_VERIFIED, 'false', { maxAge: 60 * 60 * 24 });
      throw new Error('reCAPTCHA verification failed');
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);

    throw new Error('Error verifying reCAPTCHA');
  }
};

export default actionVerifyCaptcha;
