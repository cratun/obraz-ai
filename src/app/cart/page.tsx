import AppContainer from '@/app/_components/app-container';
import { getSpecialPromoCookie } from '@/app/_promo/special-promo-cookie';
import CartContent from './components/cart-content';

const CartPage = () => {
  return (
    <AppContainer className="relative pb-10 pt-20 md:pt-[--save-navbar-padding-top]">
      <AppContainer.Content className="flex flex-col gap-6 text-text lg:gap-10">
        <CartContent specialPromoCookie={getSpecialPromoCookie()} />
      </AppContainer.Content>
    </AppContainer>
  );
};
export default CartPage;
