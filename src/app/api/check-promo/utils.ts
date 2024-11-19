export const GIFT_COUPONS = ['GIFT30', 'GIFT60', 'GIFT100'] as const;

export type GiftCodeCouponName = (typeof GIFT_COUPONS)[number];

export type CheckPromoResponse = {
  percentOff: number | null;
  amountOff: number | null;
  promoCodeId: string;
  giftCodeName: GiftCodeCouponName | null;
};

export const checkIsGiftCodeCouponName = (name: unknown): name is GiftCodeCouponName => {
  return typeof name === 'string' && GIFT_COUPONS.includes(name as GiftCodeCouponName);
};
