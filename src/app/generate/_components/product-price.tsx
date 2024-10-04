import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const ProductPrice = async () => {
  const price = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID!);

  if (!price.unit_amount) {
    throw new Error('No price.unit_amount found');
  }

  return <span className="font-semibold">{price.unit_amount / 100} zł</span>;
};

export default ProductPrice;
