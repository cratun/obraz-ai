'use client';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Badge } from '@mui/material';
import { useCartStorage } from '@/app/cart/components/add-to-cart-button';

const NavbarCartIcon = () => {
  const { cartItems } = useCartStorage();

  return (
    <Badge
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      badgeContent={cartItems.length}
      color="accent"
      overlap="circular"
      slotProps={{ badge: { className: 'size-[18px] min-w-[18px]' } }}
    >
      <ShoppingCartRoundedIcon className="text-xl text-text" />
    </Badge>
  );
};

export default NavbarCartIcon;
