import { Suspense } from 'react';
import { Metadata } from 'next';
import AppContainer from '@/app/_components/app-container';
import AppNavbar from '@/app/_components/app-navbar';
import BenefitsSection from '@/app/_components/benefits-section';
import { getSpecialPromoCookie } from '@/app/_promo/special-promo-cookie';
import CartContent from './components/cart-content';

export const metadata: Metadata = {
  title: ' ObrazAI - Twój Koszyk | Sprawdź i Zamów Unikalne Obrazy',
  description:
    'Przejrzyj swój koszyk w ObrazAI. Finalizuj zamówienie i ciesz się wyjątkowymi obrazami stworzonymi z Twojej wyobraźni.',
};

const CartPage = () => {
  return (
    <>
      <Suspense fallback={<AppNavbar isLoading />}>
        <AppNavbar />
      </Suspense>
      <AppContainer className="relative pb-10 pt-[--save-navbar-padding-top]">
        <AppContainer.Content className="flex flex-col gap-6 text-text lg:gap-10">
          <CartContent specialPromoCookie={getSpecialPromoCookie()} />
        </AppContainer.Content>
      </AppContainer>
      <BenefitsSection className="hidden md:flex" />
    </>
  );
};
export default CartPage;
