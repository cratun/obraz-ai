'use client';
import { ReactNode, useState } from 'react';
import { SvgIconComponent } from '@mui/icons-material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Drawer, DrawerProps, IconButton } from '@mui/material';
import { twMerge } from 'tailwind-merge';
import Typography from '@/app/_components/typography';

const ProductDetailsDrawer = ({
  className,
  Icon,
  title,
  children,
  onClose,
  ...props
}: Omit<DrawerProps, 'onClose' | 'variant'> & { Icon: SvgIconComponent; title: string; onClose: () => void }) => {
  return (
    <Drawer
      {...props}
      classes={{ paper: 'p-5 gap-10 lg:max-w-sm' }}
      className={twMerge('z-[2000]', className)}
      variant="temporary"
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-between text-text">
        <div className="flex items-center gap-2.5">
          <Icon className="text-3xl" />
          <Typography.H3> {title}</Typography.H3>
        </div>
        <IconButton className="text-text" onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </div>
      <div className="flex flex-col gap-5 text-text">{children}</div>
    </Drawer>
  );
};

const ProductDetails = ({ children, title, Icon }: { children: ReactNode; title: string; Icon: SvgIconComponent }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ProductDetailsDrawer
        anchor="right"
        className="hidden lg:block"
        Icon={Icon}
        open={open}
        title={title}
        onClose={() => setOpen(false)}
      >
        {children}
      </ProductDetailsDrawer>
      <ProductDetailsDrawer
        anchor="bottom"
        className="lg:hidden"
        Icon={Icon}
        open={open}
        title={title}
        onClose={() => setOpen(false)}
      >
        {children}
      </ProductDetailsDrawer>

      <div
        className="flex w-full cursor-pointer items-center justify-between"
        role="presentation"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-2.5">
          <Icon />
          <Typography.Body> {title}</Typography.Body>
        </div>
        <AddOutlinedIcon />
      </div>
    </>
  );
};

const ProductDetailsSection = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) => (
  <div className="flex flex-col gap-2.5">
    <Typography.Body className="font-bold">
      {title} {children}
    </Typography.Body>
    <Typography.Body>{description}</Typography.Body>
  </div>
);

ProductDetails.Section = ProductDetailsSection;
export default ProductDetails;
