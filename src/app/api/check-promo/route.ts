import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { CheckPromoResponse } from './utils';

export async function GET(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ errorCode: 'CODE_PARAMETER_REQUIRED' }, { status: 400 });
  }

  try {
    const promotionCodes = await stripe.promotionCodes.list({ limit: 1, code });

    const promoCodeData = promotionCodes.data[0];

    if (!promoCodeData) {
      return NextResponse.json({ errorCode: 'PROMO_CODE_NOT_FOUND' }, { status: 404 });
    }

    if (!promoCodeData.active) {
      return NextResponse.json({ errorCode: 'PROMO_CODE_NOT_ACTIVE' }, { status: 400 });
    }

    return NextResponse.json({
      percentOff: promoCodeData.coupon.percent_off,
      amountOff: promoCodeData.coupon.amount_off,
      promoCodeId: promoCodeData.id,
    } satisfies CheckPromoResponse);
  } catch (error) {
    console.error('Error checking promo code:', error);

    return NextResponse.json({ errorCode: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}
